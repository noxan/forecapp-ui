import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { useState } from "react";
import DatasetColumns from "./DatasetColumns";
import DatasetTable from "./DatasetTable";
import DatasetVisualize from "./DatasetVisualize";

const datasetPanels = [
  {
    title: "Overview",
    component: DatasetColumns,
  },
  {
    title: "Visualize",
    component: DatasetVisualize,
  },
  {
    title: "Table",
    component: DatasetTable,
  },
];

const DatasetExplorer = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) => {
  const [activeKey, setActiveKey] = useState(0);

  const DatasetPanel = datasetPanels[activeKey].component;

  return (
    <CModal
      fullscreen
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Dataset explorer</CModalTitle>
        <CNav variant="pills" className="mx-4">
          {datasetPanels.map((panel, index) => (
            <CNavItem key={panel.title}>
              <CNavLink
                href="#"
                active={index === activeKey}
                onClick={() => setActiveKey(index)}
              >
                {panel.title}
              </CNavLink>
            </CNavItem>
          ))}
        </CNav>
      </CModalHeader>
      <CModalBody>
        <DatasetPanel />
      </CModalBody>
    </CModal>
  );
};

export default DatasetExplorer;
