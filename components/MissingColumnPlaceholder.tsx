import { CCol, CContainer, CRow } from "@coreui/react";
import LinkButton from "./LinkButton";

export default function MissingColumnPlaceholder() {
  return (
    <CContainer>
      <CRow className="my-5">
        <CCol>
          <LinkButton href="/wizard/pick-time">
            Start with time and prediction column selection
          </LinkButton>
        </CCol>
      </CRow>
    </CContainer>
  );
}
