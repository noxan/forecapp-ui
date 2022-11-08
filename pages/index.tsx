import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../src/store";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";
import { addTransform } from "../src/store/transforms";

export default function Home() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

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
            {state.datasets.status}
          </CCol>
          <CCol>
            {state.datasets.raw && (
              <CCol>
                <pre style={{ maxHeight: "20rem" }}>
                  {JSON.stringify(state.datasets.raw.slice(0, 1), null, 2)}
                </pre>
              </CCol>
            )}
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow>
          <CCol>
            <h1>Column mapping</h1>
            <CButton onClick={() => dispatch(addTransform())}>
              Add transform
            </CButton>
            <pre>{JSON.stringify(state.transforms)}</pre>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
