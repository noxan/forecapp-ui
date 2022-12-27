import {
  CCol,
  CContainer,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import { useState } from "react";
import { isColumnValid } from "../../src/definitions";
import { capitalize } from "../../src/helpers";
import { useAppSelector } from "../../src/hooks";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../../src/store/selectors";
import ColumnConfigPanel from "../ColumnConfigPanel";

const DatasetColumns = () => {
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const dataset = useAppSelector(selectDataset);

  const [activeKey, setActiveKey] = useState(0);

  const columns = Object.keys(dataset[0]);
  const activeColumn = columns[activeKey];

  return (
    <CContainer>
      <CRow className="my-2">
        <CCol>
          <h1>Dataset</h1>
        </CCol>
      </CRow>
      {isColumnValid(timeColumn) && (
        <>
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
  );
};

export default DatasetColumns;
