import { CCol, CContainer, CRow } from "@coreui/react";
import Link from "next/link";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";

export default function Visualization() {
  const datasets = useAppSelector((state) => state.datasets);

  if (!datasets) {
    return (
      <Layout>
        <Link href="/">Import dataset first</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Visualization</h1>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <h1></h1>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
