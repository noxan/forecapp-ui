import { CCol, CContainer, CRow } from "@coreui/react";
import Link from "next/link";
import Layout from "./Layout";

const MissingDatasetPlaceholder = () => (
  <Layout>
    <CContainer>
      <CRow>
        <CCol>
          <Link href="/">Import dataset first</Link>
        </CCol>
      </CRow>
    </CContainer>
  </Layout>
);

export default MissingDatasetPlaceholder;
