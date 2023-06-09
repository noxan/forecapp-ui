import { useState } from "react";
import { CButton, CButtonGroup, CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import { useAppDispatch } from "../../src/hooks";
import { selectDataset } from "../../src/store/selectors";
import Table from "../Table";

const DatasetTablePreview = ({
  timeColumn,
  setTimeColumn,
  targetColumn,
  setTargetColumn,
}: {
  timeColumn: string;
  setTimeColumn: Function;
  targetColumn: string;
  setTargetColumn: Function;
}) => {
  const [selectTime, setSelectTime] = useState<boolean>(false);
  const [selectTarget, setSelectTarget] = useState<boolean>(false);
  const dataset = useAppSelector(selectDataset);
  const tableHead = dataset.slice(0, 10);
  const dispatch = useAppDispatch();
  return (
    <div>
      <CButtonGroup>
        <CButton
          onClick={() => {
            setSelectTime(true);
            setSelectTarget(false);
          }}
          color="info"
          variant={selectTime ? "outline" : undefined}
          shape="rounded-0"
        >
          Set Time Column
        </CButton>
        <CButton
          onClick={() => {
            setSelectTime(false);
            setSelectTarget(true);
          }}
          color="success"
          variant={selectTarget ? "outline" : undefined}
          shape="rounded-0"
        >
          Set Target Column
        </CButton>
      </CButtonGroup>
      <CContainer fluid={false}>
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
      </CContainer>
    </div>
  );
};

export default DatasetTablePreview;
