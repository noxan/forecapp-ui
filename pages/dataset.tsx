import {
  CButton,
  CCol,
  CContainer,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import { useState } from "react";
import ColumnConfigPanel from "../components/ColumnConfigPanel";
import Layout from "../components/Layout";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import PrimaryColumnConfig from "../components/PrimaryColumnConfig";
import {
  ColumnConfig,
  COLUMN_PRIMARY_TARGET,
  COLUMN_PRIMARY_TIME,
  SELECT_STATE_INITIALIZE,
  SELECT_STATE_NONE,
  SPECIAL_COLUMN_CONFIGURATIONS,
} from "../src/definitions";
import { capitalize } from "../src/helpers";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import {
  resetColumnConfiguration,
  setTargetColumn,
  setTimeColumn,
} from "../src/store/datasets";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";

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
  const dispatch = useAppDispatch();
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const dataset = useAppSelector(selectDataset);

  const [columnConfigs, setColumnConfigs] = useState<{
    [x: string]: ColumnConfig;
  }>({});
  const [activeKey, setActiveKey] = useState(0);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  // TODO: initialize empty header columns if dataset does not provide any
  const columns = Object.keys(dataset[0]);

  const activeColumn = columns[activeKey];

  const setColumnConfig = (configUpdate: object) =>
    setColumnConfigs({
      ...columnConfigs,
      [activeColumn]: {
        ...columnConfigs[activeColumn],
        ...configUpdate,
      },
    });

  // TODO: Possibly move column auto initialization to importDataset action
  if (timeColumn === SELECT_STATE_INITIALIZE) {
    autodetectColumn(COLUMN_PRIMARY_TIME, columns, (col: string) =>
      dispatch(setTimeColumn(col))
    );
  }
  if (targetColumn === SELECT_STATE_INITIALIZE) {
    autodetectColumn(COLUMN_PRIMARY_TARGET, columns, (col: string) =>
      dispatch(setTargetColumn(col))
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
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h2>Primary time series column</h2>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <PrimaryColumnConfig
              columns={columns}
              label="time"
              defaultValue={timeColumn}
              setAction={setTimeColumn}
            />
          </CCol>
          <CCol>
            <PrimaryColumnConfig
              columns={columns}
              label="target"
              defaultValue={targetColumn}
              setAction={setTargetColumn}
            />
          </CCol>
          <CCol>
            <div>{dataset.length} entries</div>
            <div>{columns.length} columns</div>
            <CButton
              color="danger"
              onClick={() => dispatch(resetColumnConfiguration())}
            >
              Reset
            </CButton>
          </CCol>
        </CRow>
        {timeColumn !== undefined &&
          timeColumn !== SELECT_STATE_NONE &&
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
                    {columns.map((header, index) => (
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
