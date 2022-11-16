import {
  CCol,
  CContainer,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import Link from "next/link";
import { useState } from "react";
import ColumnConfigPanel from "../components/ColumnConfigPanel";
import Layout from "../components/Layout";
import Table from "../components/Table";
import {
  COLUMN_PRIMARY_TARGET,
  COLUMN_PRIMARY_TIME,
  DATATYPES,
  SELECT_STATE_INITIALIZE,
  SELECT_STATE_NONE,
  SPECIAL_COLUMN_CONFIGURATIONS,
} from "../src/definitions";
import { capitalize } from "../src/helpers";
import { useAppSelector } from "../src/hooks";

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

type ColumnConfig = {
  inputName?: string; // equals "id"
  label?: string;
  datatype?: typeof DATATYPES;
  outputName?: string;
};

export default function Dataset() {
  const dataset = useAppSelector((state) => state.datasets?.raw);
  const [timeColumn, setTimeColumn] = useState<string>(SELECT_STATE_INITIALIZE);
  const [targetColumn, setTargetColumn] = useState<string>(
    SELECT_STATE_INITIALIZE
  );
  const [columnConfigs, setColumnConfigs] = useState<{
    [x: string]: ColumnConfig;
  }>({});
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

  const activeColumn = headers[activeKey];

  const setColumnConfig = (configUpdate: object) =>
    setColumnConfigs({
      ...columnConfigs,
      [activeColumn]: {
        ...columnConfigs[activeColumn],
        ...configUpdate,
      },
    });

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
                  <ColumnConfigPanel
                    column={activeColumn}
                    dataset={dataset}
                    timeColumn={timeColumn}
                    targetColumn={targetColumn}
                    columnConfig={columnConfigs[activeColumn]}
                    setColumnConfig={setColumnConfig}
                  />
                </CCol>
              </CRow>
            </>
          )}
      </CContainer>
    </Layout>
  );
}
