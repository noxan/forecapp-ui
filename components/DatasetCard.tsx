import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";

type Dataset = {
  title: string;
  image: string;
  filename: string;
};

type DatasetCardProps = {
  dataset: Dataset;
  importAction: (filepath: string) => void;
};

const datasetBaseUrl = "/public/datasets/";

const DatasetCard = ({ dataset, importAction }: DatasetCardProps) => (
  <CCol xs key={dataset.filename}>
    <CCard
      className="mb-3"
      onClick={() => importAction(datasetBaseUrl + dataset.filename)}
    >
      <CRow className="g-0">
        <CCol md={4}>
          <CCardImage
            src={`https://images.unsplash.com/${dataset.image}?fit=crop&w=460&h=460&q=80`}
          />
        </CCol>
        <CCol md={8}>
          <CCardBody>
            <CCardTitle>{dataset.title}</CCardTitle>
            <CCardText></CCardText>
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  </CCol>
);

export default DatasetCard;
