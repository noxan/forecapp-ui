import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../src/store";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";

export default function Home() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <h1>Dataset</h1>
          <DatasetImporter />
        </CRow>
        <CRow>
          <CCol>{state.datasets.status}</CCol>
          {state.datasets.raw && (
            <CCol>
              <pre>{JSON.stringify(state.datasets.raw.slice(0, 5))}</pre>
            </CCol>
          )}
        </CRow>
        <CRow>
          <h1>Transforms</h1>
          {JSON.stringify(state.transforms)}
        </CRow>
      </CContainer>
    </Layout>
  );
}
