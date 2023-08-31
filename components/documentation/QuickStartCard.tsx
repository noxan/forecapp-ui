import { CCard, CCardHeader, CCardBody, CCardImage } from "@coreui/react";

export default function QuickStartCard({
  text,
  img,
}: {
  text: string;
  img: any;
}) {
  return (
    <CCard>
      <CCardImage orientation="top" src={img}></CCardImage>
      <CCardBody>{text}</CCardBody>
    </CCard>
  );
}
