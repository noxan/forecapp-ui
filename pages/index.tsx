import { CCol, CContainer, CFormInput, CRow } from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import Welcome from "../components/Welcome";
import DatasetCard from "../components/DatasetCard";
import { importDatasetWithAutodetect } from "../src/store/datasets";
import { selectDataset } from "../src/store/selectors";
import { useRouter } from "next/router";
import LinkButton from "../components/LinkButton";

const datasetBaseUrl = "/datasets/";
const datasetExamples = [
  {
    title: "Energy (full)",
    filename: "energy_dataset.csv",
    image: "photo-1473341304170-971dccb5ac1e",
  },
  {
    title: "Online retail (5k)",
    filename: "online_retail_II_5k.csv",
    image: "photo-1563013544-824ae1b704d3",
  },
  {
    title: "Air passengers",
    filename: "air_passengers.csv",
    image: "photo-1569629743817-70d8db6c323b",
  },
  {
    title: "Energy (small)",
    filename: "energy_dataset_small.csv",
    image: "photo-1473341304170-971dccb5ac1e",
  },
];

export default function Home() {
  const router = useRouter();
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector((state) => state.datasets.status);
  const dispatch = useAppDispatch();

  const isDatasetLoaded = !!dataset;

  const importAction = async (source: any) => {
    await dispatch(importDatasetWithAutodetect({ source }));
    router.push("/wizard/pick-time");
  };

  return (
    <main>
      <Welcome />
      <CContainer>
        {isDatasetLoaded && (
          <CRow className="my-5">
            <CCol>
              <LinkButton color="primary" href="/wizard/pick-time">
                Continue with previous dataset
              </LinkButton>
            </CCol>
          </CRow>
        )}
        <CRow className="my-2">
          <CCol>
            <h5>Select a dataset below to get started</h5>
          </CCol>
        </CRow>
        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 4 }}>
          {datasetExamples.map((dataset) => (
            <DatasetCard
              key={dataset.filename}
              dataset={dataset}
              importAction={(source) => importAction(datasetBaseUrl + source)}
              disabled={status === "loading"}
            />
          ))}
        </CRow>
        <CRow className="my-2">
          <CCol>
            <h5>Import from your computer</h5>
            <CFormInput
              type="file"
              label="Select a file to import"
              disabled={status === "loading"}
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
