import {
  CButton,
  CCol,
  CContainer,
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
import { SELECT_STATE_INITIALIZE, SELECT_STATE_NONE } from "../src/definitions";
import { capitalize } from "../src/helpers";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import {
  resetAndDetectColumnConfig,
  setTargetColumn,
  setTimeColumn,
} from "../src/store/datasets";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";

export default function Dataset() {
  const dispatch = useAppDispatch();
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const dataset = useAppSelector(selectDataset);

  const [activeKey, setActiveKey] = useState(0);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  const columns = Object.keys(dataset[0]);
  const activeColumn = columns[activeKey];

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
              onClick={() =>
                dispatch(resetAndDetectColumnConfig({ columnHeaders: columns }))
              }
            >
              Reset
            </CButton>
          </CCol>
        </CRow>
        {isColumnValid(timeColumn) && (
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
                />
              </CCol>
            </CRow>
          </>
        )}
      </CContainer>
    </Layout>
  );
}
