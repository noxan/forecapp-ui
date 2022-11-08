import { CButton, CCol, CFormInput } from "@coreui/react";
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
    <div>
      {exampleDatasets.map((exampleDatasetUrl) => (
        <CButton
          key={exampleDatasetUrl}
          onClick={() => dispatch(importDataset({ source: exampleDatasetUrl }))}
          disabled={status === "loading"}
          className="m-1"
        >
          Load {exampleDatasetUrl}
        </CButton>
      ))}
      <CFormInput
        type="file"
        onChange={(evt) => {
          if (evt.target.files && evt.target.files.length > 0) {
            return dispatch(importDataset({ source: evt.target.files[0] }));
          }
        }}
      />
    </div>
  );
};

export default DatasetImporter;
