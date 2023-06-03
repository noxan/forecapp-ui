import { CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import { selectDataset } from "../../src/store/selectors";
import Table from "../Table";

const DatasetTable = () => {
  const dataset = useAppSelector(selectDataset);
  const tableHead = dataset.slice(0, 10);
  return (
    <CContainer fluid={false}>
      <CRow className="my-2">
        <CCol onClick={() => console.log("Test")}>
          <Table data={tableHead} />
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default DatasetTable;
