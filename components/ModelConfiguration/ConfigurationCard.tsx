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
  explanation,
  children,
}: {
  title: string;
  explanation: string;
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
            <CCollapse visible={explanationVisible}>{explanation}</CCollapse>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
}
