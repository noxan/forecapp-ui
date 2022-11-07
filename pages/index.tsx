import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../src/store";
import { importDataset } from "../src/store/datasets";
import Layout from "../components/Layout";

const exampleDatasets = [
  "datasets/energy_dataset_small.csv",
  "datasets/air_passengers.csv",
];

export default function Home() {
  const datasets = useSelector((state: any) => state.datasets);
  const isLoading = datasets.status === "loading";
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Layout>
      <CContainer>
        {exampleDatasets.map((exampleDatasetUrl) => (
          <CRow key={exampleDatasetUrl} className="my-2">
            <CCol>
              <CButton
                onClick={() =>
                  dispatch(importDataset({ url: exampleDatasetUrl }))
                }
                disabled={isLoading}
              >
                Load {exampleDatasetUrl}
              </CButton>
            </CCol>
          </CRow>
        ))}
      </CContainer>
      <CContainer>
        <CRow>
          <CCol>{datasets.status}</CCol>
        </CRow>
        {datasets.raw && (
          <CRow>
            <CCol>
              <pre>{JSON.stringify(datasets.raw.slice(0, 5))}</pre>
            </CCol>
          </CRow>
        )}
      </CContainer>
    </Layout>
  );
}
