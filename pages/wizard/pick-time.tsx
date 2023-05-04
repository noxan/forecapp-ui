import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useState } from "react";
import DatasetExplorer from "../../components/DatasetExplorer";
import LinkButton from "../../components/LinkButton";
import MissingDatasetPlaceholder from "../../components/MissingDatasetPlaceholder";
import PrimaryColumnConfig from "../../components/PrimaryColumnConfig";
import { isColumnValid } from "../../src/definitions";
import { useAppSelector } from "../../src/hooks";
import { setTimeColumn } from "../../src/store/datasets";
import { selectDataset, selectTimeColumn } from "../../src/store/selectors";

export default function WizardTimeColumnPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const timeColumn = useAppSelector(selectTimeColumn);
  const dataset = useAppSelector(selectDataset);

  const isValid = isColumnValid(timeColumn);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  const columns = Object.keys(dataset[0]);

  return (
    <main>
      <DatasetExplorer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <CContainer className="mt-5">
        <CRow className="my-2">
          <CCol>
            <h2>Pick the column containing the time information.</h2>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <p>
              {`Info: To pick the primary time series column from a dataset, you can first identify which column contains the time series data. This can typically be done by looking at the column headers and identifying the one that represents the time variable. Once you have identified the time series column, you can select it for further analysis or visualization. Some common names for time series columns in a dataset are "time", "date", "timestamp", and "datetime."`}
            </p>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <PrimaryColumnConfig
              columns={columns}
              label="time"
              defaultValue={timeColumn}
              setAction={setTimeColumn}
            />
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <LinkButton
              color="primary"
              disabled={!isValid}
              href="/wizard/pick-target"
            >
              Confirm
            </LinkButton>

            <LinkButton
              color="primary"
              variant="ghost"
              href="/wizard/data-errors"
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
