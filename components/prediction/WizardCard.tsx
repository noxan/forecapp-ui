import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCloseButton,
} from "@coreui/react";

export type PredictionWizardCardProps = {
  className: string;
  closeSelf: () => void;
};

const PredictionWizardCard = (props: PredictionWizardCardProps) => (
  <CCard className={props.className}>
    <CCardHeader>
      <CCloseButton onClick={props.closeSelf}></CCloseButton>
    </CCardHeader>
    <CCardBody>
      <CCardTitle> Getting Started</CCardTitle>
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
