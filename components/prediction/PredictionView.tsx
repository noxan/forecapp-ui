import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import {
  selectDataset,
  selectModelConfiguration,
  selectStatus,
  selectTargetColumn,
} from "../../src/store/selectors";
import { PredictionChart } from "./Chart";
import { ZodError } from "zod";
import {
  HTTPError,
  ValidationError,
  NeuralProphetError,
} from "../../src/error";
import { transformDataset } from "../../src/helpers";
import { ModelParameters } from "../../src/schemas/modelParameters";
import { apiPrediction } from "../../src/store/datasets";
import { errorToastWithMessage } from "../ErrorToast";
import { CToaster } from "@coreui/react";
import LoadingOverlay from "./LoadingOverlay";

export type PredictionChartConfig = {
  showUncertainty: boolean;
  showTrend: boolean;
  showEvents: boolean;
};

export default function PredictionView() {
  const predictionData = useAppSelector((state) => state.datasets.prediction);
  const targetColumn = useAppSelector(selectTargetColumn);
  const status = useAppSelector(selectStatus);

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
          showUncertainty={true}
          showEvents={false}
          showTrend={false}
        />
      )}
    </>
  );
}
