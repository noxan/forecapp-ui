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
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import iwanthue from "iwanthue";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { capitalize, generateChartFormatForSeries } from "../src/helpers";
import { useAppSelector } from "../src/hooks";

const SELECT_STATE_INITIALIZE = "SELECT_STATE_INITIALIZE_UNIQUE";
const SELECT_STATE_NONE = "SELECT_STATE_NONE_UNIQUE";

const datatypes = ["string", "number", "boolean", "datetime", "integer"];

const COLUMN_PRIMARY_TIME = Symbol();
const COLUMN_PRIMARY_TARGET = Symbol();
const SPECIAL_COLUMN_CONFIGURATIONS = {
  [COLUMN_PRIMARY_TIME]: {
    id: COLUMN_PRIMARY_TIME,
    defaultInputNames: ["ds", "datetime", "timestamp", "date", "time", "day"],
    outputName: "ds",
    datatype: "datetime",
  },
  [COLUMN_PRIMARY_TARGET]: {
    id: COLUMN_PRIMARY_TARGET,
    defaultInputNames: ["y", "value", "target", "output", "score"],
    outputName: "y",
    datatype: "number",
  },
};

// Time column autodetction
const autodetectColumn = (
  column: keyof typeof SPECIAL_COLUMN_CONFIGURATIONS,
  headers: string[],
  setTimeColumn: Function
) => {
  const config = SPECIAL_COLUMN_CONFIGURATIONS[column];
  const intersection = headers.filter((value) =>
    config.defaultInputNames.includes(value.trim().toLowerCase())
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
  const [targetColumn, setTargetColumn] = useState<string>(
    SELECT_STATE_INITIALIZE
  );
  const [activeKey, setActiveKey] = useState(0);

  const chartColor = iwanthue(1)[0];

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
    autodetectColumn(COLUMN_PRIMARY_TIME, headers, setTimeColumn);
  }
  if (targetColumn === SELECT_STATE_INITIALIZE) {
    autodetectColumn(COLUMN_PRIMARY_TARGET, headers, setTargetColumn);
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
            {" "}
            <h2>Primary time series column</h2>
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
          <CCol>
            <CFormSelect
              label="Target column"
              defaultValue={targetColumn as string}
              onChange={(e) => setTargetColumn(e.target.value)}
              options={[
                {
                  label: "Select primary target column",
                  value: SELECT_STATE_NONE,
                },
                ...headers.map((header) => ({
                  label: capitalize(header),
                  value: header,
                })),
              ]}
            />
          </CCol>
          <CCol>
            <div>{dataset.length} entries</div>
            <div>{headers.length} columns</div>
          </CCol>
        </CRow>
        {timeColumn !== SELECT_STATE_NONE &&
          timeColumn !== SELECT_STATE_INITIALIZE && (
            <>
              <hr />
              <CRow className="my-2">
                <CCol>
                  <h2>Columns explorer and configurations</h2>
                </CCol>
              </CRow>
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
                    {(() => {
                      const column = headers[activeKey];

                      return (
                        <CTabPane visible>
                          <h3>{capitalize(column)}</h3>
                          {timeColumn === column && (
                            <div>
                              <CBadge color="primary">
                                Primary time column
                              </CBadge>
                            </div>
                          )}
                          <h4>Column data type</h4>
                          {timeColumn === column && (
                            <div>
                              <CBadge color="warning">Must be datetime</CBadge>
                            </div>
                          )}
                          <div>
                            Current type (auto detect):{" "}
                            {dataset
                              .map((row: any) => typeof row[column])
                              .filter(
                                (value: any, index: number, self: any) =>
                                  self.indexOf(value) === index
                              )
                              .join(", ")}
                          </div>
                          <CFormSelect
                            label="Data type"
                            defaultValue={SELECT_STATE_NONE}
                            onChange={(evt) => console.log(evt.target.value)}
                            options={[
                              {
                                label: "Select data type for column",
                                value: SELECT_STATE_NONE,
                              },
                              ...datatypes.map((datatype) => ({
                                label: capitalize(datatype),
                                value: datatype,
                              })),
                            ]}
                          />
                          <div>
                            Output column name:{" "}
                            <CBadge color="warning">
                              Possibly defined by feature, e.g. {`"ds" or "y"`}
                            </CBadge>
                          </div>
                          <h4>Data series</h4>
                          <CChartLine
                            data={generateChartFormatForSeries(
                              dataset.map((row: any) => row[timeColumn]),
                              capitalize(column),
                              dataset.map((row: any) => row[column]),
                              chartColor
                            )}
                            type={"line"}
                          />
                          <h4>Value distribution</h4>
                          {(() => {
                            // TODO: create bins if data type allows
                            const counts = {};
                            dataset.forEach(
                              (row: any) =>
                                (counts[row[column]] = counts[row[column]]
                                  ? counts[row[column]] + 1
                                  : 1)
                            );
                            const keys = Object.keys(counts).sort();
                            return (
                              <CChartBar
                                type="bar"
                                data={{
                                  labels: keys,
                                  datasets: [
                                    {
                                      label: "Value distribution",
                                      data: keys.map((key: any) => counts[key]),
                                      backgroundColor: chartColor + "30",
                                      borderColor: chartColor + "90",
                                    },
                                  ],
                                }}
                              />
                            );
                          })()}
                          <h4>Validation errors</h4>
                        </CTabPane>
                      );
                    })()}
                  </CTabContent>
                </CCol>
              </CRow>
            </>
          )}
      </CContainer>
    </Layout>
  );
}
