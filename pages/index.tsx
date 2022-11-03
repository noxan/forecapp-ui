import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import Layout from "../components/Layout";

type ExampleDataset = {
  title: string;
  filename: string;
};

const datasetBaseUrl = "/public/datasets/";
const datasetExamples: ExampleDataset[] = [
  { title: "Energy prices", filename: "energy_dataset_small.csv" },
  { title: "Air passengers", filename: "air_passengers.csv" },
];

export default function Home() {
  return (
    <Layout>
      <CContainer>
        <h1>Home</h1>
        <CContainer fluid>
          <CRow>
            {datasetExamples.map((dataset) => (
              <CCol sm="auto" key={dataset.filename}>
                <CCard>
                  <CCardBody>
                    <CCardTitle>{dataset.title}</CCardTitle>
                    <CCardText>
                      {datasetBaseUrl}
                      {dataset.filename}
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CContainer>
      </CContainer>
    </Layout>
  );
}
