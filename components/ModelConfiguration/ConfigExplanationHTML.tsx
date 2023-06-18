import {
  CCard,
  CCardBody,
  CCardText,
  CCardHeader,
  CCloseButton,
  CCardLink,
} from "@coreui/react";
import { ReactElement } from "react";

export default function ConfigExplanationHTML({
  explanationText,
  documentationLink = "https://dogecoin.com/",
  visible = false,
  setVisible,
}: {
  explanationText: ReactElement;
  documentationLink: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  return (
    <>
      {visible && (
        <CCard>
          <CCardHeader className="text-end">
            <CCloseButton onClick={() => setVisible(false)}></CCloseButton>
          </CCardHeader>
          <CCardBody>{explanationText}</CCardBody>
          <CCardBody>
            <CCardLink
              href={documentationLink}
              target="_blank"
              rel="noreferrer"
            >
              Link to documentation
            </CCardLink>
          </CCardBody>
        </CCard>
      )}
    </>
  );
}
