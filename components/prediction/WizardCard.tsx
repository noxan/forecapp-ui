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
      <CCardTitle>Getting started</CCardTitle>
      <CCardText>
        Congratulations on your forecast. The forecast is mostly automatically
        configured. You can further improve it by adjusting the settings below
        and check the metrics on the top right. Make sure to update your
        forecast after you make changes.
      </CCardText>
      {/* <CButton variant="outline" href="#">
        Improve your forecast
      </CButton> */}
    </CCardBody>
  </CCard>
);

export default PredictionWizardCard;
