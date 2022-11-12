import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import ReactJson from "react-json-view";

export default function Debug() {
  const state = useAppSelector((state) => state);

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Debug</h1>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <ReactJson src={state} />
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
