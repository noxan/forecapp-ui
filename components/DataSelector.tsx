import { useState } from "react";
import DatasetTablePreview from "./DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "./DatasetExplorer/DatasetVisualize";
import { CButton, CButtonGroup, CButtonToolbar } from "@coreui/react";

export default function DataSelector() {
  const [selectTime, setSelectTime] = useState<boolean>(false);
  const [selectTarget, setSelectTarget] = useState<boolean>(false);
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
