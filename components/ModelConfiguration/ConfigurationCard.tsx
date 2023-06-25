import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CCollapse,
  CButton,
  CCloseButton,
} from "@coreui/react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { ReactElement, useState } from "react";
import ConfigExplanationHTML from "./ConfigExplanationHTML";

export default function ConfigurationCard({
  title,
  explanation,
  documentationLink,
  children,
}: {
  title: string;
  explanation: ReactElement;
  documentationLink: string;
  children: any;
}) {
  const [explanationVisible, setExplanationVisible] = useState(false);
  return (
    <CCard className="my-3">
      <CCardBody>
        <CCardTitle>
          {title}
          <IconButton onClick={() => setExplanationVisible(true)}>
            <InfoIcon />
          </IconButton>
        </CCardTitle>
        <div className="row align-items-start">
          <div className="col-12">
            {children}
            <br />
            <ConfigExplanationHTML
              explanationText={explanation}
              documentationLink={documentationLink}
              visible={explanationVisible}
              setVisible={setExplanationVisible}
            />
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
}
