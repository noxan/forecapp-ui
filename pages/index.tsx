import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { ColumnConfigurations, resetColumns } from "../src/store/datasets";
import ColumnConfiguration from "../components/ColumnConfiguration";
import Prediction from "../components/Prediction";

const transformDataset = (dataset: any[], columns: ColumnConfigurations) =>
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

export default function Home() {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const finalDataset =
    state.datasets.raw && state.datasets.columns
      ? transformDataset(state.datasets.raw, state.datasets.columns)
      : undefined;

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Dataset</h1>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <DatasetImporter />
            <div>{state.datasets.status}</div>
            <CButton onClick={() => dispatch(resetColumns())}>
              Init/reset columns (click this after loading dataset or to reset)
            </CButton>
          </CCol>
          {state.datasets.raw && (
            <CCol>
              <pre style={{ maxHeight: "10rem" }}>
                {JSON.stringify(state.datasets.raw.slice(0, 1), null, 2)}
              </pre>
            </CCol>
          )}
        </CRow>
      </CContainer>
      {state.datasets.raw && state.datasets.columns && <ColumnConfiguration />}
      {finalDataset && (
        <Prediction
          finalDataset={finalDataset}
          columns={state.datasets.columns}
          modelConfiguration={state.models}
          prediction={state.datasets.prediction}
          status={state.datasets.status}
        />
      )}
    </Layout>
  );
}
