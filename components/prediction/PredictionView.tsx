import { useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectStatus, selectTargetColumn } from "../../src/store/selectors";
import { PredictionChart } from "./Chart";
import LoadingOverlay from "./LoadingOverlay";
import { PredictionConfig } from "./PredictionConfigCard";
import {
  CAlert,
  CButton,
  CCallout,
  CCol,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { unparse as papaUnparse } from "papaparse";

const exportCSV = (data: any) => {
  // Transform data into CSV format
  const keys = Object.keys(data);
  const tmp = Object.values(data[keys[0]]).map((_, index) => {
    const obj: any = {};
    keys.forEach((key: any) => {
      obj[key] = data[key][index];
    });
    return obj;
  });
  const csv = papaUnparse(tmp);
  // Download CSV
  const blob = new Blob([csv]);
  const href = URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.href = href;
  tempLink.setAttribute("download", "forecapp-export.csv");
  tempLink.click();
};

export default function PredictionView(props: {
  chartConfig: PredictionConfig;
  stalePrediction: boolean;
  predict: () => void;
  exportModal: boolean;
  onCloseModal: () => void;
}) {
  const predictionData = useAppSelector((state) => state.datasets.prediction);
  const targetColumn = useAppSelector(selectTargetColumn);
  const status = useAppSelector(selectStatus);
  const confidenceLevel = useAppSelector(
    (state) => state.models.validation.confidenceLevel
  );

  return (
    <>
      <CCollapse visible={props.stalePrediction}>
        <CAlert color="primary">
          <CRow>
            <CCol> The model configuration changed. Rerun prediction?</CCol>
            <CCol>
              <CButton onClick={props.predict}>Confirm</CButton>
            </CCol>
          </CRow>
        </CAlert>
      </CCollapse>
      {status === "loading" && (
        <LoadingOverlay msg={"Generating your forecast..."} />
      )}
      {predictionData && predictionData.status === "ok" && (
        <PredictionChart
          forecast={predictionData.forecast}
          targetColumn={targetColumn}
          numForecasts={predictionData.configuration?.forecasts}
          showUncertainty={props.chartConfig.showUncertainty}
          showEvents={props.chartConfig.showEvents}
          showTrend={props.chartConfig.showTrend}
          showHistory={props.chartConfig.showHistory}
          confidenceLevel={confidenceLevel}
        />
      )}
      <CModal visible={props.exportModal} onClose={props.onCloseModal}>
        <CModalHeader>
          <CModalTitle>Export</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="d-grid gap-2 col-3 mx-auto text-nowrap justify-content-md-center">
            <CButton
              disabled={!predictionData || !predictionData.forecast}
              onClick={() => exportCSV(predictionData.forecast)}
            >
              Export prediction as CSV
            </CButton>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={props.onCloseModal}>
            Done
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
