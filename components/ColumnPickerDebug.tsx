import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import {
  detectColumnConfig,
  setTargetColumn,
  setTimeColumn,
} from "../src/store/datasets";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import MissingDatasetPlaceholder from "./MissingDatasetPlaceholder";
import PrimaryColumnConfig from "./PrimaryColumnConfig";

export const ColumnPickerDebug = () => {
  const dispatch = useAppDispatch();
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  const columns = Object.keys(dataset[0]);
  return (
    <CContainer>
      <CRow className="my-2">
        <CCol>
          <h2>Primary columns</h2>
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
        <CCol>
          <PrimaryColumnConfig
            columns={columns}
            label="target"
            defaultValue={targetColumn}
            setAction={setTargetColumn}
          />
        </CCol>
        <CCol>
          <div>{dataset.length} entries</div>
          <div>{columns.length} columns</div>
          <CButton
            color="danger"
            onClick={() => dispatch(detectColumnConfig(columns))}
          >
            Reset (with autodetect)
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ColumnPickerDebug;
