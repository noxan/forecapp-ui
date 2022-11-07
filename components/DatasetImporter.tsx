import { CButton, CCol } from "@coreui/react";
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
    <>
      {exampleDatasets.map((exampleDatasetUrl) => (
        <CCol key={exampleDatasetUrl}>
          <CButton
            onClick={() => dispatch(importDataset({ url: exampleDatasetUrl }))}
            disabled={status === "loading"}
          >
            Load {exampleDatasetUrl}
          </CButton>
        </CCol>
      ))}
    </>
  );
};

export default DatasetImporter;
