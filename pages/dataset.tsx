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
import { CChartLine } from "@coreui/react-chartjs";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { capitalize } from "../src/helpers";
import { useAppSelector } from "../src/hooks";

const INITIALIZE = Symbol();
type TimeColumnNameType = string | typeof INITIALIZE | undefined;
const defaultTimeColumnNames = ["time", "timestamp", "date"];

const datatypes = ["string", "number", "boolean", "datetime", "integer"];

export default function Dataset() {
  const datasets = useAppSelector((state) => state.datasets);
  const [timeColumn, setTimeColumn] = useState<TimeColumnNameType>(INITIALIZE);
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

  if (timeColumn === INITIALIZE) {
    const intersection = headers.filter((value) =>
      defaultTimeColumnNames.includes(value)
    );
    if (intersection.length > 0) {
      setTimeColumn(intersection[0]);
    } else {
      setTimeColumn(undefined);
    }
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
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h2>Validation</h2>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <p>Timeline column: {timeColumn}</p>
          </CCol>
        </CRow>
        {timeColumn !== undefined && timeColumn !== INITIALIZE && (
          <CRow>
            <CCol md={3}>
              <CNav variant="pills" className="flex-column">
                {headers.map((header, index) => (
                  <CNavItem key={index}>
                    <CNavLink
                      href={`#${header}`}
                      active={activeKey === index}
                      onClick={(evt) => {
                        evt.preventDefault();
                        setActiveKey(index);
                      }}
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
                    <h2>{capitalize(header)}</h2>

                    {/* <CChartLine data={} /> */}

                    {dataset.map((item: any) => item[header])}

                    <ul>
                      <li>Display name</li>
                      <li>Data type</li>
                      <li>Errors</li>
                      <li>Value distribution</li>
                      <li>Chart over time</li>
                      <li>
                        {`Output column name (possibly defined by feature, e.g. "ds" or "y")`}{" "}
                      </li>
                    </ul>
                  </CTabPane>
                ))}
              </CTabContent>
            </CCol>
          </CRow>
        )}
      </CContainer>
    </Layout>
  );
}
