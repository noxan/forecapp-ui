import { CCol, CContainer, CRow } from "@coreui/react";
import LinkButton from "./LinkButton";

const MissingDatasetPlaceholder = () => (
  <CContainer>
    <CRow className="my-5">
      <CCol>
        <LinkButton href="/">Start with import dataset</LinkButton>
      </CCol>
    </CRow>
  </CContainer>
);

export default MissingDatasetPlaceholder;
