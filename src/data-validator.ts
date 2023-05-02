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
};

export function validate(
  dataset: { [key: string]: any }[],
  settings: ValidationSettings
): DataValidationError[] {
  const errors: DataValidationError[] = [];
  const nCols = Object.keys(dataset[0]).length;
  const nRows = dataset.length;
  if (settings.minCols && nCols < settings.minCols) {
    errors.push({
      type: "Validation",
      level: "Error",
      message:
        "Not enough columns in your dataset (Expected: >${settings.minCols - 1}, Recieved: ${nCols})",
    });
  }
  if (settings.maxCols && nCols > settings.maxCols) {
    errors.push({
      type: "Validation",
      level: "Error",
      message:
        "Too many columns in your dataset (Expected: <${settings.maxCols + 1}, Recieved: ${nCols})",
    });
  }
  if (settings.minRows && nCols < settings.minRows) {
    errors.push({
      type: "Validation",
      level: "Error",
      message:
        "Not enough rows in your dataset (Expected: >${settings.minRows - 1}, Recieved: ${nRows})",
    });
  }
  if (settings.maxRows && nCols > settings.maxRows) {
    if (settings.cutToSize) {
      dataset.splice(settings.maxRows);
      const removedCnt = nRows - settings.maxRows;
      errors.push({
        type: "Validation",
        level: "Warning",
        message:
          "Removed ${removedCnt} rows from your dataset as it had too many rows.",
      });
    } else {
      errors.push({
        type: "Validation",
        level: "Error",
        message:
          "Too many rows in your dataset (Expected: <${settings.maxRows + 1}, Recieved: ${nRows})",
      });
    }
  }

  return errors;
}
