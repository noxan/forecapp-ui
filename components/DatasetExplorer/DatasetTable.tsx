import { CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import { selectDataset } from "../../src/store/selectors";
import Table from "../Table";

const DatasetTable = () => {
  const dataset = useAppSelector(selectDataset);

  return (
    <CContainer fluid>
      <CRow className="my-2">
        <CCol>
          <Table data={dataset} />
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default DatasetTable;
