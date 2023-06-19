import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import {
  selectDataset,
  selectModelConfiguration,
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

export type PredictionChartConfig = {
  showUncertainty: boolean;
  showTrend: boolean;
  showEvents: boolean;
};

export default function PredictionView() {
  const dispatch = useAppDispatch();
  const predictionData = useAppSelector((state) => state.datasets.prediction);
  const targetColumn = useAppSelector(selectTargetColumn);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dataset = useAppSelector(selectDataset);
  const columns = useAppSelector((state) => state.datasets.columns);

  const [errorMessage, setErrorMessage] = useState<ReactElement>();

  const predictAction = async () => {
    try {
      // check that form inputs are valid before calling api
      ModelParameters.parse(modelConfiguration);
      // then call api
      await dispatch(
        apiPrediction({
          dataset: transformDataset(dataset, modelConfiguration, columns),
          configuration: modelConfiguration,
        })
      ).unwrap();
    } catch (err: any) {
      if (err instanceof ZodError) {
        setErrorMessage(
          errorToastWithMessage("The model configuration was invalid.")
        );
      } else if (err.message) {
        const error = err as HTTPError;
        setErrorMessage(
          errorToastWithMessage("Something went wrong: " + error.message)
        );
      } else if (err.detail) {
        if (err.detail instanceof Array) {
          const error = err as ValidationError;
          setErrorMessage(
            errorToastWithMessage("The model configuration was invalid.")
          );
        } else {
          const error = err as NeuralProphetError;
          setErrorMessage(
            errorToastWithMessage("Neural Prophet failed: " + error.detail)
          );
        }
      } else {
        setErrorMessage(errorToastWithMessage("An unknown error occured."));
      }
    }
  };

  useEffect(() => {
    predictAction();
  }, [modelConfiguration]);

  return (
    <PredictionChart
      forecast={predictionData.forecast}
      targetColumn={targetColumn}
      numForecasts={predictionData.configuration?.forecasts}
      showUncertainty={true}
      showEvents={false}
      showTrend={false}
    />
  );
}
