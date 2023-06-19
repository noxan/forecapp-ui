import { CButton, CButtonGroup, CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import { useAppDispatch } from "../../src/hooks";
import { selectDataset } from "../../src/store/selectors";
import { setTimeColumn, setTargetColumn } from "../../src/store/datasets";
import Table from "../Table";

const DatasetTablePreview = ({
  selectTime,
  selectTarget,
}: {
  selectTime: boolean;
  selectTarget: boolean;
}) => {
  const dataset = useAppSelector(selectDataset);
  const tableHead = dataset.slice(0, 10);
  const dispatch = useAppDispatch();
  return (
    <div>
      <CRow className="my-2">
        <CCol
          onClick={(e: any) =>
            selectTime
              ? dispatch(setTimeColumn(e.target.outerText))
              : selectTarget
              ? dispatch(setTargetColumn(e.target.outerText))
              : null
          }
        >
          <Table data={tableHead} />
        </CCol>
      </CRow>
    </div>
  );
};

export default DatasetTablePreview;
