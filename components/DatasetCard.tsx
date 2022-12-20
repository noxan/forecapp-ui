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
  disabled: boolean;
};

const DatasetCard = ({ dataset, importAction, disabled }: DatasetCardProps) => (
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
              <CButton
                disabled={disabled}
                onClick={() => importAction(dataset.filename)}
                className="stretched-link"
              >
                Import dataset
              </CButton>
            </CCardText>
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  </CCol>
);

export default DatasetCard;
