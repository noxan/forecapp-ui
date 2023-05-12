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
  ["milliseconds"]: "yyyy-MM-DD hh:mm:ss.SSS a",
  ["seconds"]: "yyyy-MM-DD hh:mm:ss a",
  ["minutes"]: "yyyy-MM-DD hh:mm a",
  ["hours"]: "YYYY-MM-DD hh a",
  ["days"]: "yyyy-MM-DD a",
  ["weeks"]: "yyyy-MM-DD a",
  ["months"]: "yyyy-MM a",
};

export const timeUnits: timeResolution[] = [
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
];

export const msTimeDurations: { [key in timeResolution]: number } = {
  ["milliseconds"]: 1,
  ["seconds"]: 1000,
  ["minutes"]: 1000 * 60,
  ["hours"]: 1000 * 60 * 60,
  ["days"]: 1000 * 60 * 60 * 24,
  ["weeks"]: 1000 * 60 * 60 * 24 * 7,
  ["months"]: 1000 * 60 * 60 * 24 * 30,
};
