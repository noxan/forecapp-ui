import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import {
  ColumnConfigurations,
  neuralprophet,
  resetColumns,
} from "../src/store/datasets";
import ColumnConfiguration from "../components/ColumnConfiguration";

const transformDataset = (dataset: any[], columns: ColumnConfigurations) =>
  dataset
    .map((row) => {
      const newRow: any = {};
      Object.values(columns).forEach((column) => {
        // skip empty rows and missing values
        if (!row[column.identifier]) {
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
      {state.datasets.raw && state.datasets.columns && (
        <>
          <ColumnConfiguration />

          <CContainer>
            <CRow className="my-2">
              <CCol>
                <h1>Model input</h1>
              </CCol>
            </CRow>
            <CRow md={{ cols: 2 }}>
              <CCol>
                <h3>Dataset</h3>
                <pre style={{ maxHeight: "20rem" }}>
                  {JSON.stringify(finalDataset, null, 2)}
                </pre>
              </CCol>
              <CCol>
                <h3>Parameters</h3>
                <pre style={{ maxHeight: "20rem" }}>
                  {JSON.stringify(state.models, null, 2)}
                </pre>
              </CCol>
            </CRow>
            <CRow className="my-2">
              <CCol>
                <CButton
                  onClick={() => {
                    dispatch(
                      neuralprophet({
                        dataset: finalDataset,
                        configuration: state.models,
                      })
                    );
                  }}
                >
                  Run prediction
                </CButton>
              </CCol>
            </CRow>
            {state.datasets.prediction && (
              <CRow md={{ cols: 2 }}>
                <CCol>
                  <h3>Forecast</h3>
                  <pre style={{ maxHeight: "20rem" }}>
                    {JSON.stringify(
                      state.datasets.prediction.forecast,
                      null,
                      2
                    )}
                  </pre>
                </CCol>
                <CCol>
                  <h3>Metrics</h3>
                  <pre style={{ maxHeight: "20rem" }}>
                    {JSON.stringify(state.datasets.prediction.metrics, null, 2)}
                  </pre>
                </CCol>
              </CRow>
            )}
          </CContainer>
        </>
      )}
    </Layout>
  );
}
