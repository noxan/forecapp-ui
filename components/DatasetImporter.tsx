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
    <div>
      {exampleDatasets.map((exampleDatasetUrl) => (
        <CButton
          key={exampleDatasetUrl}
          onClick={() => dispatch(importDataset({ url: exampleDatasetUrl }))}
          disabled={status === "loading"}
          className="m-1"
        >
          Load {exampleDatasetUrl}
        </CButton>
      ))}
    </div>
  );
};

export default DatasetImporter;
