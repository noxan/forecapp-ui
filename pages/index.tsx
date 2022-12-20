import { CButton, CCol, CContainer, CFormInput, CRow } from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import Welcome from "../components/Welcome";
import DatasetCard from "../components/DatasetCard";
import { importDatasetWithAutodetect } from "../src/store/datasets";
import { selectDataset } from "../src/store/selectors";

const datasetBaseUrl = "/datasets/";
const datasetExamples = [
  {
    title: "Energy prices",
    filename: "energy_dataset_small.csv",
    image: "photo-1473341304170-971dccb5ac1e",
  },
  {
    title: "Air passengers",
    filename: "air_passengers.csv",
    image: "photo-1569629743817-70d8db6c323b",
  },
];

export default function Home() {
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector((state) => state.datasets.status);
  const dispatch = useAppDispatch();

  const isDatasetLoaded = !!dataset;

  const importAction = (source: any) => {
    dispatch(importDatasetWithAutodetect({ source }));
  };

  return (
    <main>
      <Welcome />
      <CContainer>
        {isDatasetLoaded && (
          <CRow className="my-5">
            <CCol>
              <CButton color="primary" href="/wizard/pick-time">
                Continue with previous dataset
              </CButton>
            </CCol>
          </CRow>
        )}
        <CRow className="my-2">
          <CCol>
            <h5>Select a dataset below to get started</h5>
          </CCol>
        </CRow>
        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
          {datasetExamples.map((dataset) => (
            <DatasetCard
              key={dataset.filename}
              dataset={dataset}
              importAction={(source) => importAction(datasetBaseUrl + source)}
            />
          ))}
        </CRow>
        <CRow className="my-2">
          <CCol>
            <h5>Import from your computer</h5>
            <CFormInput
              type="file"
              label="Select a file to import"
              onChange={(evt) => {
                if (evt.target.files && evt.target.files.length > 0) {
                  return importAction(evt.target.files[0]);
                }
              }}
              accept=".csv"
            />
          </CCol>
        </CRow>
      </CContainer>
    </main>
  );
}
