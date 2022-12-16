import { CCol, CContainer, CRow } from "@coreui/react";

const Welcome = () => (
  <CContainer>
    <CRow className="my-5">
      <CCol>
        <h1>Forecapp</h1>
        <h4>The easy time-series forecasting app.</h4>
      </CCol>
    </CRow>
  </CContainer>
);

export default Welcome;
