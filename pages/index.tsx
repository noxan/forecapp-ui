import { CCol, CContainer, CFormInput, CRow } from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import DatasetCard from "../components/DatasetCard";
import { detectColumnConfig, parseDataset } from "../src/store/datasets";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { useRouter } from "next/router";
import LinkButton from "../components/LinkButton";
import { validateColumnDefinitions } from "../src/definitions";
import datasetExamples from "../src/datasets";

export default function Home() {
  const router = useRouter();
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const status = useAppSelector((state) => state.datasets.status);
  const dispatch = useAppDispatch();

  const isDatasetLoaded = !!dataset;
  const isColumnDefinitions = validateColumnDefinitions(
    timeColumn,
    targetColumn
  );
  const resumeHref = isColumnDefinitions ? "/prediction" : "/wizard/pick-time";

  const importAction = async (source: string | File) => {
    try {
      const parsedData = (await dispatch(parseDataset(source)).unwrap()).data;
      const columnHeaders = Object.keys(parsedData[0]);
      dispatch(detectColumnConfig(columnHeaders));
      router.push("/wizard/pick-time");
    } catch (err: any) {
      // This will catch any file errors (file doesn't exists, can't download from url, etc...)
    }
  };

  return (
    <main>
      <CContainer>
        <CRow className="my-5">
          <CCol>
            <h1>Forecapp</h1>
            <h4>The easy time-series forecasting app.</h4>
          </CCol>
        </CRow>
        {isDatasetLoaded && (
          <CRow className="my-5">
            <CCol>
              <LinkButton color="primary" href={resumeHref}>
                Continue with previous project
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
              importAction={() => importAction(dataset.fullUrl)}
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
