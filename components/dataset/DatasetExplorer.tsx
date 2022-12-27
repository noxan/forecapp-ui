import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import DatasetColumns from "./DatasetColumns";

const DatasetExplorer = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) => {
  return (
    <CModal
      fullscreen
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Dataset explorer</CModalTitle>
        <CNav variant="pills" className="mx-4">
          <CNavItem>
            <CNavLink href="#" active>
              Columns
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Visualization</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Table</CNavLink>
          </CNavItem>
        </CNav>
      </CModalHeader>
      <CModalBody>
        <DatasetColumns />
      </CModalBody>
    </CModal>
  );
};

export default DatasetExplorer;
