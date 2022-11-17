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
                <CCardText>T(t) = Trend at time t</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
