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
  CRow,
} from "@coreui/react";

export default function PredictionView(props: {
  chartConfig: PredictionConfig;
  stalePrediction: boolean;
  predict: () => void;
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
    </>
  );
}
