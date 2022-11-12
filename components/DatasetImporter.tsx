import { CBadge, CButton, CCol, CFormInput, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../src/store";
import { importDataset } from "../src/store/datasets";

const exampleDatasets = [
  "datasets/energy_dataset_small.csv",
  "datasets/air_passengers.csv",
];

const DatasetImporter = () => {
  const status = useSelector((state: RootState) => state.datasets.status);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <CRow>
      {exampleDatasets.map((exampleDatasetUrl) => (
        <CCol key={exampleDatasetUrl}>
          <CButton
            onClick={() =>
              dispatch(importDataset({ source: exampleDatasetUrl }))
            }
            disabled={status === "loading"}
            className="m-1"
          >
            Import {exampleDatasetUrl}
          </CButton>
        </CCol>
      ))}
      <CCol>
        <CFormInput
          type="file"
          onChange={(evt) => {
            if (evt.target.files && evt.target.files.length > 0) {
              return dispatch(importDataset({ source: evt.target.files[0] }));
            }
          }}
        />
      </CCol>
      <CCol>
        <CBadge color="dark">{status}</CBadge>
      </CCol>
    </CRow>
  );
};

export default DatasetImporter;
