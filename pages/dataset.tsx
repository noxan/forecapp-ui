import {
  CBadge,
  CCol,
  CContainer,
  CFormSelect,
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
import { capitalize, generateChartFormatForSeries } from "../src/helpers";
import { useAppSelector } from "../src/hooks";

const SELECT_STATE_INITIALIZE = "SELECT_STATE_INITIALIZE_UNIQUE";
const SELECT_STATE_NONE = "SELECT_STATE_NONE_UNIQUE";

const datatypes = ["string", "number", "boolean", "datetime", "integer"];

// Time column autodetction
const defaultTimeColumnNames = ["time", "timestamp", "date", "ds"];
const autodetectTimeColumn = (headers: string[], setTimeColumn: Function) => {
  const intersection = headers.filter((value) =>
    defaultTimeColumnNames.includes(value.trim().toLowerCase())
  );
  if (intersection.length > 0) {
    setTimeColumn(intersection[0]);
  } else {
    setTimeColumn(SELECT_STATE_NONE);
  }
};

export default function Dataset() {
  const dataset = useAppSelector((state) => state.datasets?.raw);
  const [timeColumn, setTimeColumn] = useState<string>(SELECT_STATE_INITIALIZE);
  const [activeKey, setActiveKey] = useState(0);

  if (!dataset) {
    return (
      <Layout>
        <Link href="/">Import dataset first</Link>
      </Layout>
    );
  }

  // TODO: initialize empty header columns if dataset does not provide any
  const headers = Object.keys(dataset[0]);

  if (timeColumn === SELECT_STATE_INITIALIZE) {
    autodetectTimeColumn(headers, setTimeColumn);
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
      {/* {dataset && <Table data={dataset.slice(0, 3)} />} */}
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h2>Validation</h2>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <CFormSelect
              label="Time column"
              defaultValue={timeColumn as string}
              onChange={(e) => setTimeColumn(e.target.value)}
              options={[
                {
                  label: "Select primary time column",
                  value: SELECT_STATE_NONE,
                },
                ...headers.map((header) => ({
                  label: capitalize(header),
                  value: header,
                })),
              ]}
            />
          </CCol>
        </CRow>
        {timeColumn !== SELECT_STATE_NONE &&
          timeColumn !== SELECT_STATE_INITIALIZE && (
            <CRow className="my-2">
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
              <CCol md={9}>
                <CTabContent>
                  {headers.map((column, index) => (
                    <CTabPane
                      key={index}
                      role="tabpanel"
                      aria-labelledby={`${column}-tab`}
                      visible={activeKey === index}
                    >
                      <h2>{capitalize(column)}</h2>
                      {timeColumn === column && (
                        <div>
                          <CBadge color="primary">Primary time column</CBadge>
                        </div>
                      )}

                      <CChartLine
                        data={generateChartFormatForSeries(
                          dataset.map((row: any) => row[timeColumn]),
                          capitalize(column),
                          dataset.map((row: any) => row[column])
                        )}
                        type={"line"}
                      />

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
