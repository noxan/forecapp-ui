import { ColumnConfigurations } from "./store/datasets";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const transformDataset = (
  dataset: any[],
  columns: ColumnConfigurations
) =>
  dataset
    .map((row) => {
      const newRow: any = {};
      Object.values(columns).forEach((column) => {
        // skip empty rows and missing values, but do not skip explicit 0 values
        if (column.functionality && !row[column.identifier]) {
          console.warn(
            `Column ${column.identifier} with value "${
              row[column.identifier]
            }" is not a valid value`
          );
          return (newRow["ERROR"] = true);
        }

        // only pick columns which have a functionality assigned
        if (column.functionality) {
          // TODO: move column output name configuration to the column functionalities (or allow user override)
          // NOTE: we'll need to come up with unique identifiers for functionalities with multiple occasions (e.g. events)
          const outputName = {
            time: "ds",
            value: "y",
          }[column.functionality];
          newRow[outputName] = row[column.identifier];
        }
      });
      return newRow;
    })
    .filter((row) => !row["ERROR"]);
