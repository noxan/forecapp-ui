import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { importDataset } from "../src/store/datasets";
import Layout from "../components/Layout";

const exampleDatasets = [
  "datasets/energy_dataset_small.csv",
  "datasets/air_passengers.csv",
];

export default function Welcome() {
  const datasets = useSelector((state: any) => state.datasets);
  const isLoading = datasets.status === "loading";
  const dispatch = useDispatch();
  return (
    <Layout>
      <CContainer>
        {exampleDatasets.map((exampleDatasetUrl) => (
          <CRow key={exampleDatasetUrl} className="my-2">
            <CCol>
              <CButton
                onClick={() => dispatch(importDataset(exampleDatasetUrl))}
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
      </CContainer>
    </Layout>
  );
}
