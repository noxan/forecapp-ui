import iwanthue from "iwanthue";
import {
  COLUMN_PRIMARY_TARGET,
  COLUMN_PRIMARY_TIME,
  SELECT_STATE_NONE,
  SPECIAL_COLUMN_CONFIGURATIONS,
} from "./definitions";
import { ModelState } from "./store/models";
import { timeResolution } from "./timeResolution";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Time column autodetction
export const autodetectColumn = (
  column: keyof typeof SPECIAL_COLUMN_CONFIGURATIONS,
  columnHeaders: string[],
  setTimeColumn: Function
) => {
  const config = SPECIAL_COLUMN_CONFIGURATIONS[column];
  const intersection = columnHeaders.filter((value) =>
    config.defaultInputNames.includes(value.trim().toLowerCase())
  );
  if (intersection.length > 0) {
    setTimeColumn(intersection[0]);
  } else {
    setTimeColumn(SELECT_STATE_NONE);
  }
};

export const transformDataset = (
  dataset: any[],
  modelConfig: ModelState,
  columns: { timeColumn: string; targetColumn: string }
) =>
  dataset
    .map((row) => {
      const newRow: any = {};

      // Special columns (time + target)
      Object.keys(columns).forEach((columnType) => {
        // TODO: check for missing values

        // TODO: add handling for other (non primary) columns
        // NOTE: we'll need to come up with unique identifiers for functionalities with multiple occasions (e.g. events)

        const specialColumnMapping =
          columnType === "timeColumn"
            ? COLUMN_PRIMARY_TIME
            : columnType === "targetColumn"
            ? COLUMN_PRIMARY_TARGET
            : false;
        if (!specialColumnMapping) {
          throw new Error(
            `Column ${columnType} is not a special column. This should not happen.`
          );
        }

        const outputName =
          SPECIAL_COLUMN_CONFIGURATIONS[specialColumnMapping].outputName;
        const identifier = columns[columnType as keyof typeof columns];
        newRow[outputName] = row[identifier];
        if (!row[identifier]) {
          newRow["ERROR"] = true;
        }
      });

      // Lagged regressors
      modelConfig.laggedRegressors.forEach((laggedRegressor: any) => {
        const outputName = laggedRegressor.name;
        const identifier = laggedRegressor.name;
        newRow[outputName] = row[identifier];
        if (!row[identifier]) {
          newRow["ERROR"] = true;
        }
      });

      return newRow;
    })
    .filter((row) => !row["ERROR"]);

export const transformDatasetForChart = (dataset: any[]) => {
  const headers = Object.keys(dataset[0]).splice(1);

  // TODO: remove hard coded "time" index
  const timeLabels = dataset
    .slice(1)
    .map((item) => item.time || item.ds || item.day);

  const colorPalette = iwanthue(headers.length);

  return {
    labels: timeLabels,
    datasets: headers.map((header, index) => ({
      label: capitalize(header),
      data: dataset.map((item) => item[header]),
      backgroundColor: colorPalette[index] + "30",
      borderColor: colorPalette[index] + "90",
    })),
  };
};

export const generateChartFormatForSeries = (
  timeLabels: string[],
  label: string,
  series: any[],
  color: string = iwanthue(1)[0]
) => ({
  labels: timeLabels,
  datasets: [
    {
      label: label,
      data: series,
      backgroundColor: color + "30",
      borderColor: color + "90",
    },
  ],
});

export const datasetTimeRange = (dataset: any[], timeColumn: string) => {
  // iterates through the dataset and looks for min and max time values
  const startDate = dataset.reduce(
    (startDate, row) =>
      startDate === undefined
        ? new Date(row[timeColumn])
        : startDate > new Date(row[timeColumn])
        ? new Date(row[timeColumn])
        : startDate,
    undefined
  );
  const endDate = dataset.reduce(
    (endDate, row) =>
      endDate === undefined
        ? new Date(row[timeColumn])
        : endDate < new Date(row[timeColumn])
        ? new Date(row[timeColumn])
        : endDate,
    undefined
  );
  return { startDate, endDate };
};

export const detectResolution = (dataset: any[], timeColumn: string) => {
  // milliseconds
  const diff =
    new Date(dataset[1][timeColumn]).getTime() -
    new Date(dataset[0][timeColumn]).getTime();

  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;

  let unit: timeResolution;

  if (months >= 1) {
    unit = "months";
  } else if (weeks >= 1) {
    unit = "weeks";
  } else if (days >= 1) {
    unit = "days";
  } else if (hours >= 1) {
    unit = "hours";
  } else if (minutes >= 1) {
    unit = "minutes";
  } else if (seconds >= 1) {
    unit = "seconds";
  } else {
    unit = "milliseconds";
  }
  return unit;
};

export const setStartEndDates = (
  startDate: string,
  endDate: string,
  timeResolution: timeResolution
) => {
  // depending on the time unit sets all lower units to 0 for start and max for end
  const start = new Date(startDate);
  const end = new Date(endDate);
  switch (timeResolution) {
    case "months":
      start.setDate(1);
      end.setDate(daysInMonth(end));
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case "weeks":
      let startDay = start.getDay();
      let endDay = end.getDay();
      if (start.getDay() === 0) {
        startDay = 6;
      } else {
        startDay -= 1;
      }
      if (end.getDay() === 0) {
        endDay = 6;
      } else {
        endDay -= 1;
      }
      start.setDate(start.getDate() - startDay);
      end.setDate(end.getDate() + (6 - endDay));
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case "days":
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case "hours":
      start.setMinutes(0, 0, 0);
      end.setMinutes(59, 59, 999);
      break;
    case "minutes":
      start.setSeconds(0, 0);
      end.setSeconds(59, 999);
      break;
    case "seconds":
      start.setMilliseconds(0);
      end.setMilliseconds(999);
      break;
    case "milliseconds":
      break;
    default:
      break;
  }
  return { startDate: start, endDate: end };
};

export const daysInMonth = (date: Date) => {
  // extracts the maximum number of days for the given date's month
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
