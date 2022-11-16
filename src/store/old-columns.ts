// TODO: make sure special columns (time, value) can only be picked once, adjust definitions, e.g. unique = true
// TODO: add other NP features as functionalities for columns, e.g. lagged regressors, future regressors, events, etc.
export const columnFunctionalities = [undefined, "time", "value"] as const;
export type ColumnFunctionalities = typeof columnFunctionalities[number];

export interface ColumnConfiguration {
  identifier: string;
  name: string;
  validation?: {
    checks: undefined;
    type: undefined;
  };
  functionality: ColumnFunctionalities;
}

export interface ColumnConfigurations {
  [key: string]: ColumnConfiguration;
}

export interface DatasetsState {
  status: "idle" | "loading";
  raw?: any[];
  columns?: ColumnConfigurations;

  // main?: any[]; // processed dataset
  prediction?: object; // results dataset, alias predictions
}

const commonColumnNames = {
  time: ["ds", "time", "timestamp", "date", "datetime"],
  value: ["y", "value"],
};

const mapColumnNameToFunctionality = (name: string): ColumnFunctionalities => {
  const lowerName = name.toLowerCase();
  for (const [functionality, names] of Object.entries(commonColumnNames)) {
    if (names.includes(lowerName)) {
      return functionality as ColumnFunctionalities;
    }
  }
  return undefined;
};


resetColumns: (state) => {
  if (!state.raw) {
    // reset columns if there is no dataset
    state.columns = undefined;
  } else {
    // TODO: handle datasets without header column
    const columns: ColumnConfigurations = {};
    Object.keys(state.raw[0]).forEach((key) => {
      columns[key] = {
        identifier: key,
        name: capitalize(key),
        functionality: mapColumnNameToFunctionality(key),
      };
    });
    state.columns = columns;
  }
},
updateColumnFunction: (
  state,
  {
    payload: { identifier, value },
  }: PayloadAction<{ identifier: string; value: ColumnFunctionalities }>
) => {
  if (!state.columns) {
    state.columns = {};
  }
  state.columns[identifier].functionality = value;
},
},
