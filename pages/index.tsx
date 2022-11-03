import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
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

export default function Home() {
  return (
    <Layout>
      <CContainer>
        <h1>Home</h1>
        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
          {datasetExamples.map((dataset) => (
            <CCol xs key={dataset.filename}>
              <CCard className="h-100">
                <CCardImage
                  orientation="top"
                  src={`https://images.unsplash.com/${dataset.image}?fit=crop&w=640&q=80`}
                />
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
        <CRow className="my-3">
          <CCol>
            <CButton>File upload and selector to load custom datasets.</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
