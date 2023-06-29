import { useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectStatus, selectTargetColumn } from "../../src/store/selectors";
import { PredictionChart } from "./Chart";
import LoadingOverlay from "./LoadingOverlay";
import { PredictionConfig } from "./PredictionConfigCard";

export default function PredictionView(props: {
  chartConfig: PredictionConfig;
}) {
  const predictionData = useAppSelector((state) => state.datasets.prediction);
  const targetColumn = useAppSelector(selectTargetColumn);
  const status = useAppSelector(selectStatus);
  const confidenceLevel = useAppSelector(
    (state) => state.models.validation.confidenceLevel
  );

  return (
    <>
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
