export type timeResolution =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months";

export type dateTimeFormats = {
  [key in timeResolution]: string;
};

export const dateTimeFormatStrings: dateTimeFormats = {
  ["milliseconds"]: "YYYY-MM-DD hh:mm:ss.SSS a",
  ["seconds"]: "YYYY-MM-DD hh:mm:ss a",
  ["minutes"]: "YYYY-MM-DD hh:mm a",
  ["hours"]: "YYYY-MM-DD hh a",
  ["days"]: "YYYY-MM-DD",
  ["weeks"]: "YYYY-MM-DD",
  ["months"]: "YYYY-MM",
};

export const timeUnits: (timeResolution | "years")[] = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
];

export const msTimeDurations: { [key in timeResolution | "years"]: number } = {
  ["milliseconds"]: 1,
  ["seconds"]: 1000,
  ["minutes"]: 1000 * 60,
  ["hours"]: 1000 * 60 * 60,
  ["days"]: 1000 * 60 * 60 * 24,
  ["weeks"]: 1000 * 60 * 60 * 24 * 7,
  ["months"]: 1000 * 60 * 60 * 24 * 30,
  ["years"]: 1000 * 60 * 60 * 24 * 365,
};
