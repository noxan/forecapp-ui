import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../src/store";
import { importDataset } from "../src/store/datasets";
import Layout from "../components/Layout";

const exampleDatasets = [
  "datasets/energy_dataset_small.csv",
  "datasets/air_passengers.csv",
];

export default function Home() {
  const state = useSelector((state: RootState) => state);
  const isLoading = state.datasets.status === "loading";
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <h1>Dataset</h1>
          {exampleDatasets.map((exampleDatasetUrl) => (
            <CCol key={exampleDatasetUrl}>
              <CButton
                onClick={() =>
                  dispatch(importDataset({ url: exampleDatasetUrl }))
                }
                disabled={isLoading}
              >
                Load {exampleDatasetUrl}
              </CButton>
            </CCol>
          ))}
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
          {}
        </CRow>
      </CContainer>
    </Layout>
  );
}
