import { useState, useMemo } from "react";
import {
  CButton,
  CButtonGroup,
  CCol,
  CContainer,
  CRow,
  CAlert,
} from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import { useAppDispatch } from "../../src/hooks";
import { selectDataset, selectTargetColumn } from "../../src/store/selectors";
import { setTimeColumn, setTargetColumn } from "../../src/store/datasets";
import { selectTimeColumn } from "../../src/store/selectors";
import Table from "../Table";
import { isColumnValid } from "../../src/definitions";
import { isColumnDateTime } from "../../src/data-validator";

const DatasetTablePreview = ({
  selectTime,
  selectTarget,
}: {
  selectTime: boolean;
  selectTarget: boolean;
}) => {
  const dataset = useAppSelector(selectDataset);
  const tableHead = dataset.slice(0, 10);
  const [columnWarningVisible, setColumnWarningVisible] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const timeColumn = useAppSelector(selectTimeColumn);
  const isTimeColumn = useMemo(() => {
    if (!isColumnValid(timeColumn)) return true;
    const res = isColumnDateTime(dataset, timeColumn);
    !res ? setColumnWarningVisible(true) : setColumnWarningVisible(false);
    return res;
  }, [dataset, timeColumn]);
  return (
    <div>
      <CAlert
        dismissible
        color="danger"
        visible={columnWarningVisible}
        onClose={() => setColumnWarningVisible(false)}
      >
        The selected column isn&apos;t a valid time column. Choose another, or
        try editing the dataset!
      </CAlert>
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
