import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from "@coreui/react";
import Layout from "../components/Layout";

type ExampleDataset = {
  title: string;
  filename: string;
  image: string;
};

const datasetBaseUrl = "/public/datasets/";
const datasetExamples: ExampleDataset[] = [
  {
    title: "Energy prices",
    filename: "energy_dataset_small.csv",
    image: "photo-1473341304170-971dccb5ac1e",
  },
  {
    title: "Air passengers",
    filename: "air_passengers.csv",
    image: "photo-1569629743817-70d8db6c323b",
  },
];

const importDataset = (filepath: string) => {
  console.log(filepath);
};

export default function Home() {
  return (
    <Layout>
      <CContainer>
        <h1>Getting started</h1>
        <h2 className="my-3">Example datasets</h2>
        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
          {datasetExamples.map((dataset) => (
            <CCol xs key={dataset.filename}>
              <CCard className="mb-3">
                <CRow className="g-0">
                  <CCol md={4}>
                    <CCardImage
                      src={`https://images.unsplash.com/${dataset.image}?fit=crop&w=460&h=460&q=80`}
                    />
                  </CCol>
                  <CCol md={8}>
                    <CCardBody>
                      <CCardTitle>{dataset.title}</CCardTitle>
                      <CCardText>
                        <CButton>Import dataset</CButton>
                      </CCardText>
                    </CCardBody>
                  </CCol>
                </CRow>
              </CCard>
            </CCol>
          ))}
        </CRow>
        <h2 className="my-3">Import dataset</h2>
        <CAlert color="secondary">Custom dataset import is coming soon.</CAlert>
        <CForm>
          <CRow>
            <CCol>
              <CFormInput type="file" disabled />
            </CCol>
            <CCol>
              <CButton disabled>Import dataset</CButton>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </Layout>
  );
}
