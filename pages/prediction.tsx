import { useAppDispatch, useAppSelector } from "../src/hooks";
import { transformDataset } from "../src/helpers";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import {
  selectDataset,
  selectModelConfiguration,
  selectStatus,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { validateColumnDefinitions } from "../src/definitions";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";
import { CCol, CContainer, CRow } from "@coreui/react";
import PredictionNavigation from "../components/prediction/Navigation";
import PredictionWizardCard from "../components/prediction/WizardCard";
import PredictionBuilder from "../components/prediction/Builder";
import { apiPrediction } from "../src/store/datasets";
import PredictionChart from "../components/prediction/Chart";
import LoadingOverlay from "../components/prediction/LoadingOverlay";
import MissingForecastPlaceholder from "../components/MissingForecastPlaceholder";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LaggedRegressorState } from "../src/store/models";

export default function Visualization() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dataset = useAppSelector(selectDataset);
  const error = useAppSelector((state) => state.datasets?.error);
  const status = useAppSelector(selectStatus);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const columns = useAppSelector((state) => state.datasets.columns);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const predictionData = useAppSelector((state) => state.datasets.prediction);

  const predictAction = () => {
    // First check that there is enough data to satisfy the given number of lags and forecasts
    // For Neural Prophet we need n_samples = data - max(lags) - forecast + 1 to be positive
    const max_lags = Math.max(
      modelConfiguration.autoregression.lags,
      ...modelConfiguration.laggedRegressors.map(
        (lr: LaggedRegressorState) => lr.lags
      )
    );
    if (dataset.length - max_lags - modelConfiguration.forecasts < 0) {
      // TODO: Need some sort of error message to the user here
      return;
    }
    dispatch(
      apiPrediction({
        dataset: transformDataset(dataset, modelConfiguration, columns),
        configuration: modelConfiguration,
      })
    );
  };

  const isFirstRun = Object.keys(router.query).includes("first-run");

  useEffect(() => {
    if (isFirstRun) {
      router.replace({ query: {} });
      predictAction();
    }
  }, []);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }
  if (!validateColumnDefinitions(timeColumn, targetColumn)) {
    return <MissingColumnPlaceholder />;
  }
  if (isFirstRun) {
    return <MissingForecastPlaceholder />;
  }

  return (
    <>
      <PredictionNavigation
        metrics={predictionData?.metrics}
        forecastData={predictionData?.forecast}
        status={status}
        apiPredictionAction={predictAction}
      />
      <CContainer fluid>
        <CRow>
          <CCol sm={3}>
            <PredictionWizardCard className="mb-2" />
            <PredictionBuilder />
          </CCol>
          <CCol style={{ position: "relative" }}>
            {status === "loading" && <LoadingOverlay />}
            {((predictionData && predictionData.status !== "ok") || error) && (
              <div>
                <h3>Something went wrong...</h3>
                {!error && predictionData && JSON.stringify(predictionData)}
                {error && JSON.stringify(error)}
              </div>
            )}
            {predictionData && predictionData.status === "ok" && (
              <PredictionChart
                targetColumn={targetColumn}
                predictionData={predictionData}
                forecasts={predictionData?.configuration?.forecasts}
              />
            )}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
