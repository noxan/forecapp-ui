import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { editModelConfig } from "../src/store/models";

const ReactJson = dynamic(() => import("@microlink/react-json-view"), {
  ssr: false,
});

export default function Debug() {
  const modelConfig = useAppSelector((state) => state.models);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Model</h1>
          </CCol>
        </CRow>

        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Trend</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Seasonality</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Auto regression</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Events and holidays</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Future and lagged regressors</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Training</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Validation</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Data preparation</CCardTitle>
                <CCardText>Text</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow className="my-2">
          <CCol>
            <Suspense fallback={`Loading...`}>
              <ReactJson
                src={modelConfig}
                sortKeys
                collapsed={1}
                onEdit={(evt) => dispatch(editModelConfig(evt))}
              />
            </Suspense>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
