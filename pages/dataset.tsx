import { CCol, CContainer, CRow } from "@coreui/react";
import Link from "next/link";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { useAppSelector } from "../src/hooks";

export default function Dataset() {
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
            <h1>Dataset</h1>
          </CCol>
        </CRow>
      </CContainer>
      {datasets.raw && <Table data={datasets.raw.slice(0, 3)} />}
    </Layout>
  );
}
