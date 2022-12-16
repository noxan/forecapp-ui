import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../src/hooks";
import Welcome from "../components/Welcome";
import DatasetImporter from "../components/DatasetImporter";

export default function Home() {
  const state = useAppSelector((state) => state);

  const isDatasetLoaded = !!state.datasets?.raw;

  return (
    <main>
      <Welcome />
      <CContainer>
        {isDatasetLoaded && (
          <CRow className="my-5">
            <CCol>
              <CButton color="primary" href="/wizard/pick-time">
                Continue with previous dataset
              </CButton>
            </CCol>
          </CRow>
        )}
        <CRow className="my-2">
          <CCol>
            <h5>
              Select a dataset below to get started or import your own dataset.
            </h5>
          </CCol>
        </CRow>
        <DatasetImporter />
      </CContainer>
    </main>
  );
}
