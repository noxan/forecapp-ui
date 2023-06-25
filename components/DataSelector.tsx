import { useState, useMemo } from "react";
import DatasetTablePreview from "./DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "./DatasetExplorer/DatasetVisualize";
import { CButton, CButtonGroup, CButtonToolbar, CAlert } from "@coreui/react";
import { isColumnValid } from "../src/definitions";
import { useAppSelector } from "../src/hooks";
import { selectDataset, selectTimeColumn } from "../src/store/selectors";
import MissingDatasetPlaceholder from "./MissingDatasetPlaceholder";
import { isColumnDateTime } from "../src/data-validator";

export default function DataSelector() {
  const [selectTime, setSelectTime] = useState<boolean>(false);
  const [selectTarget, setSelectTarget] = useState<boolean>(false);
  const [columnWarningVisible, setColumnWarningVisible] =
    useState<boolean>(false);
  const timeColumn = useAppSelector(selectTimeColumn);
  console.log(timeColumn);
  const dataset = useAppSelector(selectDataset);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }
  return (
    <>
      <CButtonToolbar role="group">
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
      </CButtonToolbar>
      <DatasetTablePreview
        selectTime={selectTime}
        selectTarget={selectTarget}
      ></DatasetTablePreview>
      <DatasetVisualize />
    </>
  );
}
