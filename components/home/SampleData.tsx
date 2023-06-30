import { useState, ReactElement } from "react";
import { CButton, CRow } from "@coreui/react";
import DatasetCard from "../DatasetCard";
import datasetExamples from "../../src/datasets";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import {
  detectColumnConfig,
  parseDataset,
  validateData,
} from "../../src/store/datasets";
import {
  selectDataErrors,
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../../src/store/selectors";
import { useRouter } from "next/router";
import { errorToastWithMessage } from "../ErrorToast";

export default function SampleData({
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
  const [errorToast, pushErrorToast] = useState<ReactElement>();
  const [url, setUrl] = useState("");
  const importAction = async (source: string | File) => {
    try {
      const parseResult = await dispatch(parseDataset(source)).unwrap();
      const columnHeaders = Object.keys(parseResult.data[0]);
      dispatch(detectColumnConfig(columnHeaders));
      dispatch(validateData());
      parseResult.errors.length > 0 ? "/wizard/data-errors" : onDataUpload();
    } catch (err: any) {
      pushErrorToast(errorToastWithMessage("Error: " + err.message));
    }
  };
  return (
    <>
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
    </>
  );
}
