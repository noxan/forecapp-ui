import { useState, ReactElement } from "react";
import { CRow, CCol, CFormInput, CButton } from "@coreui/react";
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
    </>
  );
}
