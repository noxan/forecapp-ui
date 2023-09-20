import { isColumnValid } from "./definitions";
import { DataValidationError } from "./store/datasets";

export type ValidationSettings = {
  minCols?: number;
  maxCols?: number;
  minRows?: number;
  maxRows?: number;

  // Set cutToSize to true to drop any rows past maxRows and warn the user
  cutToSize: boolean;

  // Set strictDateTime to true to throw an error if no viable datetime column is found
  strictDateTime: boolean;
  rowsToCheck: number;
};

export function validate(
  dataset: { [key: string]: any }[],
  settings: ValidationSettings
): DataValidationError[] {
  const errors: DataValidationError[] = [];
  const columns = Object.keys(dataset[0]);
  const nCols = columns.length;
  const nRows = dataset.length;
  if (settings.minCols && nCols < settings.minCols) {
    errors.push({
      type: "Validation",
      level: "Error",
      message: `Not enough columns in your dataset (Expected: >${
        settings.minCols - 1
      }, Recieved: ${nCols})`,
    });
  }
  if (settings.maxCols && nCols > settings.maxCols) {
    errors.push({
      type: "Validation",
      level: "Error",
      message: `Too many columns in your dataset (Expected: <${
        settings.maxCols + 1
      }, Recieved: ${nCols})`,
    });
  }
  if (settings.minRows && nCols < settings.minRows) {
    errors.push({
      type: "Validation",
      level: "Error",
      message: `Not enough rows in your dataset (Expected: >${
        settings.minRows - 1
      }, Recieved: ${nRows})`,
    });
  }
  if (settings.maxRows && nCols > settings.maxRows) {
    if (settings.cutToSize) {
      dataset.splice(settings.maxRows);
      const removedCnt = nRows - settings.maxRows;
      errors.push({
        type: "Validation",
        level: "Warning",
        message: `Removed ${removedCnt} rows from your dataset as it had too many rows.`,
      });
    } else {
      errors.push({
        type: "Validation",
        level: "Error",
        message: `Too many rows in your dataset (Expected: <${
          settings.maxRows + 1
        }, Recieved: ${nRows})`,
      });
    }
  }

  if (
    !columns.some((col) => isColumnDateTime(dataset, col, settings.rowsToCheck))
  ) {
    const levelToUse = settings.strictDateTime ? "Error" : "Warning";
    errors.push({
      type: "Validation",
      level: levelToUse,
      message: "We didn't find any viable time columns in your dataset.",
    });
  }
  return errors;
}

// Returns whether a column is a valid datetime column for neuralprophet
export function isColumnDateTime(
  dataset: { [key: string]: any }[],
  column: string,
  rowsToCheck: number = -1
): boolean {
  let prevDate = Number.NEGATIVE_INFINITY;
  rowsToCheck = rowsToCheck === -1 ? dataset.length : rowsToCheck;
  for (let i = 0; i < rowsToCheck; i++) {
    const row = dataset[i];
    if (!Object.values(row).some((val) => val)) {
      continue;
    }
    else {
      const date = Date.parse(row[column]);
      if (Number.isNaN(date) || date <= prevDate) {
        return false;
      }
      prevDate = date;
    }
  }
  return true;
}
