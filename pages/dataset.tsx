import {
  CCol,
  CContainer,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { capitalize } from "../src/helpers";
import { useAppSelector } from "../src/hooks";

export default function Dataset() {
  const datasets = useAppSelector((state) => state.datasets);
  const [activeKey, setActiveKey] = useState(0);

  if (!datasets) {
    return (
      <Layout>
        <Link href="/">Import dataset first</Link>
      </Layout>
    );
  }

  const dataset = datasets.raw;
  // TODO: initialize empty header columns if dataset does not provide any
  const headers = Object.keys(dataset[0]);

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
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h2>Validation</h2>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={3}>
            <CNav variant="pills" className="flex-column">
              {headers.map((header, index) => (
                <CNavItem key={index}>
                  <CNavLink
                    href="javascript:void(0);"
                    active={activeKey === index}
                    onClick={() => setActiveKey(index)}
                  >
                    {capitalize(header)}
                  </CNavLink>
                </CNavItem>
              ))}
            </CNav>
          </CCol>
          <CCol>
            <CTabContent>
              {headers.map((header, index) => (
                <CTabPane
                  key={index}
                  role="tabpanel"
                  aria-labelledby={`${header}-tab`}
                  visible={activeKey === index}
                >
                  {capitalize(header)}
                </CTabPane>
              ))}
            </CTabContent>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
