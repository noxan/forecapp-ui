import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { resetColumns } from "../src/store/datasets";
import ColumnConfiguration from "../components/ColumnConfiguration";
import Prediction from "../components/Prediction";
import { transformDataset } from "../src/helpers";

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
        <DatasetImporter />
        <CRow>
          <CCol>
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
