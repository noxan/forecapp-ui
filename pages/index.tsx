import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";
import ColumnConfiguration from "../components/ColumnConfiguration";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { resetColumns } from "../src/store/datasets";

export default function Home() {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

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
              Init/reset columns
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
    </Layout>
  );
}
