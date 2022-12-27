import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";

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
      </CModalHeader>
      <CModalBody>...</CModalBody>
    </CModal>
  );
};

export default DatasetExplorer;
