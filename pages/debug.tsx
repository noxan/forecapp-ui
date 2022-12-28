import { CBadge, CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../src/hooks";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import ColumnPickerDebug from "../components/ColumnPickerDebug";

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
    <>
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
            <CBadge color="info">
              {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}
            </CBadge>
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
      <ColumnPickerDebug />
    </>
  );
}
