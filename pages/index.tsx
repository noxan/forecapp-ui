import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CRow,
  CToaster,
} from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import DatasetCard from "../components/DatasetCard";
import {
  detectColumnConfig,
  parseDataset,
  validateData,
} from "../src/store/datasets";
import {
  selectDataErrors,
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { useRouter } from "next/router";
import LinkButton from "../components/LinkButton";
import { validateColumnDefinitions } from "../src/definitions";
import datasetExamples from "../src/datasets";
import { ReactElement, useState } from "react";
import { errorToastWithMessage } from "../components/ErrorToast";

export default function Home() {
  const router = useRouter();
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const status = useAppSelector((state) => state.datasets.status);
  const dataErrors = useAppSelector(selectDataErrors);
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState("");
  const [errorToast, pushErrorToast] = useState<ReactElement>();

  const isDatasetLoaded = !!dataset;
  const isColumnDefinitions = validateColumnDefinitions(
    timeColumn,
    targetColumn
  );
  const resumeHref = isColumnDefinitions
    ? "/new-layout"
    : dataErrors.length > 0
    ? "/wizard/data-errors"
    : "/new-layout";

  const importAction = async (source: string | File) => {
    try {
      const parseResult = await dispatch(parseDataset(source)).unwrap();
      const columnHeaders = Object.keys(parseResult.data[0]);
      dispatch(detectColumnConfig(columnHeaders));
      dispatch(validateData());
      router.push(
        parseResult.errors.length > 0 ? "/wizard/data-errors" : "/new-layout"
      );
    } catch (err: any) {
      pushErrorToast(errorToastWithMessage("Error: " + err.message));
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
        <CRow className="my-2">
          <CCol>
            <h5>Import from your computer</h5>
            <CFormInput
              type="file"
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
        <CRow>
          <h5>Import online dataset</h5>
          <CCol>
            <CFormInput
              type="text"
              onChange={(evt) => {
                setUrl(evt.target.value);
              }}
            />
          </CCol>
          <CCol>
            <CButton
              color="primary"
              disabled={status === "loading"}
              onClick={(_) => {
                importAction(url);
              }}
            >
              Submit
            </CButton>
          </CCol>
          <br />
          <br />
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
      </CContainer>
      <CToaster push={errorToast} placement="bottom-end" />
    </main>
  );
}
