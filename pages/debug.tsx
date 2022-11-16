import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("@microlink/react-json-view"), {
  ssr: false,
});

const resetApplication = () => {
  window.localStorage.clear();
  window.location.reload();
};

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
            <CButton color="danger" onClick={() => resetApplication()}>
              Hard reset application
            </CButton>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <Suspense fallback={`Loading...`}>
              <ReactJson src={state} sortKeys collapsed={1} />
            </Suspense>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
