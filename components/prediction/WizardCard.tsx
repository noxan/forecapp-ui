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
      <CCardTitle>Configuration wizard</CCardTitle>
      <CCardText>
        To improve your forecast best follow the configuration wizard to learn
        about all the components and build a solid baseline model.
      </CCardText>
      <CButton variant="outline" href="#">
        Improve your forecast
      </CButton>
    </CCardBody>
  </CCard>
);

export default PredictionWizardCard;
