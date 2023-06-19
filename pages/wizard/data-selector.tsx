import { useState } from "react";
import DatasetTablePreview from "../../components/DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "../../components/DatasetExplorer/DatasetVisualize";
import { CButton, CButtonGroup, CButtonToolbar } from "@coreui/react";
import DatasetExplorer from "../../components/DatasetExplorer";

export default function WizardDataSelectorPage() {
  const [datasetExplorerVisible, setDatasetExplorerVisible] = useState(false);
  const [selectTime, setSelectTime] = useState<boolean>(false);
  const [selectTarget, setSelectTarget] = useState<boolean>(false);
  return (
    <div className="row">
      <div className="col-12 justify-content-start">
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
          <CButtonGroup>
            <CButton onClick={() => setDatasetExplorerVisible(true)}>
              Explore full dataset
            </CButton>
          </CButtonGroup>
        </CButtonToolbar>
        <DatasetExplorer
          modalVisible={datasetExplorerVisible}
          setModalVisible={setDatasetExplorerVisible}
        />
        <DatasetTablePreview
          selectTime={selectTime}
          selectTarget={selectTarget}
        ></DatasetTablePreview>
        <DatasetVisualize />
      </div>
    </div>
  );
}
