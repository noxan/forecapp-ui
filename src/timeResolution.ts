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
