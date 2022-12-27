import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../src/hooks";
import { default as TableComponent } from "../../components/Table";
import MissingDatasetPlaceholder from "../../components/MissingDatasetPlaceholder";

export default function Explore() {
  const dataset = useAppSelector((state) => state.datasets?.raw);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Explore dataset</h1>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer fluid>
        <CRow className="my-2">
          <CCol>{dataset && <TableComponent data={dataset} />}</CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
