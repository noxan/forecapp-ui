import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";

const DatasetExplorer = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) => {
  return (
    <CModal
      size="xl"
      fullscreen="xl"
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
      <CModalBody>...</CModalBody>
    </CModal>
  );
};

export default DatasetExplorer;
