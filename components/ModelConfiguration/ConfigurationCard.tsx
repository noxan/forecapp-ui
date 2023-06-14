import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CCollapse,
  CButton,
} from "@coreui/react";
import { useState } from "react";

export default function ConfigurationCard({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const [explanationVisible, setExplanationVisible] = useState(false);
  return (
    <CCard className="my-3">
      <CCardBody>
        <CCardTitle>{title}</CCardTitle>
        <div className="row align-items-start">
          <div className="col-9">{children}</div>
          <div className="col-3">
            <CButton onClick={() => setExplanationVisible(!explanationVisible)}>
              {explanationVisible ? "Hide" : "Show"} explanation
            </CButton>
            <CCollapse visible={explanationVisible}>
              <h3>Placeholder explanation</h3>
            </CCollapse>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
}
