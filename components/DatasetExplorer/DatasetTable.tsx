import { CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import { selectDataset } from "../../src/store/selectors";
import Table from "../Table";

const DatasetTable = () => {
  const dataset = useAppSelector(selectDataset);
  const MAX_ROWS = 20;
  return (
    <CContainer fluid>
      <CCol>
        <CRow>
          <Table data={dataset.slice(0, MAX_ROWS)} />
        </CRow>
        {dataset.length > MAX_ROWS && (
          <CRow>{dataset.length - MAX_ROWS} other rows...</CRow>
        )}
      </CCol>
    </CContainer>
  );
};

export default DatasetTable;
