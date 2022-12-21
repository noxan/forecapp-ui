import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from "@coreui/react";

const PredictionWizardCard = ({ className }: any) => (
  <CCard className={className}>
    <CCardBody>
      <CCardTitle>Card title</CCardTitle>
      <CCardText>
        Some quick example text to build on the card title and make up the bulk
        of the card&apos;s content.
      </CCardText>
      <CButton href="#">Go somewhere</CButton>
    </CCardBody>
  </CCard>
);

export default PredictionWizardCard;
