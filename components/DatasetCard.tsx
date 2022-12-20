import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
} from "@coreui/react";

type Dataset = {
  title: string;
  image: string;
  filename: string;
  subtitle?: string;
  description?: string;
};

type DatasetCardProps = {
  dataset: Dataset;
  importAction: (filepath: string) => void;
  disabled: boolean;
};

const DatasetCard = ({ dataset, importAction, disabled }: DatasetCardProps) => (
  <CCol xs key={dataset.filename}>
    <CCard className="mb-3">
      <CCardImage
        orientation="top"
        src={`https://images.unsplash.com/${dataset.image}?fit=crop&w=630&h=210&q=80`}
      />
      <CCardBody>
        <CCardTitle>{dataset.title}</CCardTitle>
        <CCardSubtitle className="mb-2 text-medium-emphasis">
          {dataset.subtitle}
        </CCardSubtitle>
        <CCardText>{dataset.description}</CCardText>
        <CButton
          disabled={disabled}
          variant="outline"
          className="stretched-link"
          onClick={(evt) => {
            evt.preventDefault();
            importAction(dataset.filename);
          }}
        >
          Import "{dataset.title}" dataset
        </CButton>
      </CCardBody>
    </CCard>
  </CCol>
);

export default DatasetCard;
