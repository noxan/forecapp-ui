import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";
import { useAppSelector } from "../src/hooks";
import Table from "../components/Table";

export default function Home() {
  const state = useAppSelector((state) => state);

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Dataset</h1>
          </CCol>
        </CRow>
        <DatasetImporter />
        {state.datasets.raw && <Table data={state.datasets.raw.slice(0, 3)} />}
      </CContainer>
    </Layout>
  );
}
