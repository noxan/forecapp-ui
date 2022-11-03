import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";

const datasets = [
  "datasets/energy_dataset_small.csv",
  "datasets/air_passengers.csv",
];

const importDataset = (filepath: string) => {
  console.log(filepath);
};

export default function Welcome() {
  return (
    <Layout>
      <CContainer>
        {datasets.map((dataset) => (
          <CRow key={dataset} className="my-2">
            <CCol>
              <CButton onClick={() => importDataset(dataset)}>
                Load {dataset}
              </CButton>
            </CCol>
          </CRow>
        ))}
      </CContainer>
    </Layout>
  );
}
