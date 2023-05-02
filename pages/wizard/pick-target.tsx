import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useState } from "react";
import DatasetExplorer from "../../components/DatasetExplorer";
import LinkButton from "../../components/LinkButton";
import MissingDatasetPlaceholder from "../../components/MissingDatasetPlaceholder";
import PrimaryColumnConfig from "../../components/PrimaryColumnConfig";
import { isColumnValid } from "../../src/definitions";
import { useAppSelector } from "../../src/hooks";
import { setTargetColumn } from "../../src/store/datasets";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../../src/store/selectors";

export default function WizardTimeColumnPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const targetColumn = useAppSelector(selectTargetColumn);
  const timeColumn = useAppSelector(selectTimeColumn);
  const dataset = useAppSelector(selectDataset);

  const isValid = isColumnValid(targetColumn);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  const columns = Object.keys(dataset[0]).filter(
    (column) => column !== timeColumn
  );

  return (
    <main>
      <DatasetExplorer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <CContainer className="mt-5">
        <CRow className="my-2">
          <CCol>
            <h2>Pick the column for which you wish to create a prediction.</h2>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <p>
              Info: The model needs to know which value you wish to predict,
              often also called target column and labeled with the character y
              in many more scientific contexts.
              <br />
              Depending on your dataset a common pick might be “price”,
              “demand”, “sales”, “visitors”, “inventory”, ...
            </p>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <PrimaryColumnConfig
              columns={columns}
              label="prediction"
              defaultValue={targetColumn}
              setAction={setTargetColumn}
            />
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <LinkButton
              color="primary"
              disabled={!isValid}
              href="/wizard/data-errors"
            >
              Confirm
            </LinkButton>
            <LinkButton
              color="primary"
              variant="ghost"
              href="/wizard/pick-time"
              className="mx-2"
            >
              Back
            </LinkButton>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol>
            <div>You can also explore the dataset in detail.</div>
            <CButton onClick={() => setModalVisible(true)} variant="outline">
              Browse dataset
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </main>
  );
}
