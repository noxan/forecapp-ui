import { useState, ReactElement } from "react";
import {
  CRow,
  CCol,
  CFormInput,
  CButton,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CCard,
  CCardBody,
  CCardTitle,
  CTable,
  CTableHead,
  CTableRow,
  CCardHeader,
} from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import {
  detectColumnConfig,
  parseDataset,
  validateData,
} from "../../src/store/datasets";
import {
  selectDataset,
  selectTargetColumn,
  selectDataErrors,
  selectTimeColumn,
} from "../../src/store/selectors";
import { useRouter } from "next/router";
import { errorToastWithMessage } from "../ErrorToast";
import datasetExamples from "../../src/datasets";
import DatasetCard from "../DatasetCard";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function DataUpload({
  onDataUpload,
}: {
  onDataUpload: () => void;
}) {
  const router = useRouter();
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const status = useAppSelector((state) => state.datasets.status);
  const dataErrors = useAppSelector(selectDataErrors);
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState("");
  const [explanationVisible, setExplanationVisible] = useState(false);
  const [errorToast, pushErrorToast] = useState<ReactElement>();
  const importAction = async (source: string | File) => {
    try {
      const parseResult = await dispatch(parseDataset(source)).unwrap();
      const columnHeaders = Object.keys(parseResult.data[0]);
      dispatch(detectColumnConfig(columnHeaders));
      dispatch(validateData());
      parseResult.errors.length > 0
        ? router.push("/wizard/data-errors")
        : onDataUpload();
    } catch (err: any) {
      pushErrorToast(errorToastWithMessage("Error: " + err.message));
    }
  };
  return (
    <>
      <CAccordion activeItemKey={0}>
        <CAccordionItem itemKey={0}>
          <CAccordionHeader>
            <h5>Upload Dataset</h5>
          </CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                <CRow className="my-2">
                  <CCol>
                    <h5>
                      Import from your computer{" "}
                      <IconButton
                        onClick={() =>
                          setExplanationVisible(!explanationVisible)
                        }
                      >
                        <InfoIcon />
                      </IconButton>
                    </h5>
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
              </CCol>
              <CCol>
                {explanationVisible && (
                  <CCard>
                    <CCardHeader>Dataset Format</CCardHeader>
                    <CCardBody>
                      <b>Sample Format</b>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <th>Time</th>
                            <th>Target</th>
                            <th>a</th>
                            <th>b</th>
                            <th>...</th>
                          </CTableRow>
                        </CTableHead>
                        <CTableRow>
                          <td>valid date-time format</td>
                          <td>numeric</td>
                          <td>any</td>
                          <td>any</td>
                          <td>...</td>
                        </CTableRow>
                      </CTable>
                      <p>
                        The dataset must be a .csv file with at least two
                        columns, one time column, and one target column. The
                        time has to be given in a valid date-time format, and
                        the target column must be numeric. Any other columns are
                        optional. In case additional columns should be used as
                        regressors, they must be numeric.
                      </p>
                    </CCardBody>
                  </CCard>
                )}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            <h5>Choose Sampel Dataset</h5>
          </CAccordionHeader>
          <CAccordionBody>
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
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </>
  );
}
