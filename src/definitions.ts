export const SELECT_STATE_INITIALIZE = "SELECT_STATE_INITIALIZE_UNIQUE";
export const SELECT_STATE_NONE = "SELECT_STATE_NONE_UNIQUE";

export const datatypes = [
  "string",
  "number",
  "boolean",
  "datetime",
  "integer",
] as const;

export const COLUMN_PRIMARY_TIME = Symbol();
export const COLUMN_PRIMARY_TARGET = Symbol();
export const SPECIAL_COLUMN_CONFIGURATIONS = {
  [COLUMN_PRIMARY_TIME]: {
    id: COLUMN_PRIMARY_TIME,
    label: "Time",
    defaultInputNames: ["ds", "datetime", "timestamp", "date", "time", "day"],
    outputName: "ds",
    datatype: "datetime",
  },
  [COLUMN_PRIMARY_TARGET]: {
    id: COLUMN_PRIMARY_TARGET,
    label: "Target",
    defaultInputNames: ["y", "value", "target", "output", "score", "price"],
    outputName: "y",
    datatype: "number",
  },
};
