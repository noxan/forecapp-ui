import { ReactElement, useEffect, useState } from "react";
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
import {
  CCol,
  CContainer,
  CRow,
  CToast,
  CToastClose,
  CToastBody,
  CToaster,
} from "@coreui/react";
import PredictionNavigation from "../components/prediction/Navigation";
import PredictionWizardCard from "../components/prediction/WizardCard";
import PredictionBuilder from "../components/prediction/Builder";
import { apiPrediction } from "../src/store/datasets";
import { PredictionChart } from "../components/prediction/Chart";
import LoadingOverlay from "../components/prediction/LoadingOverlay";
import MissingForecastPlaceholder from "../components/MissingForecastPlaceholder";
import { useRouter } from "next/router";
import { ModelParameters } from "../src/schemas/modelParameters";
import { HTTPError, ValidationError, NeuralProphetError } from "../src/error";
import { ZodError } from "zod";
import ModelHistory from "../components/history/ModelHistory";
import { errorToastWithMessage } from "../components/ErrorToast";

export default function Visualization() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector(selectStatus);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const columns = useAppSelector((state) => state.datasets.columns);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const predictionData = useAppSelector((state) => state.datasets.prediction);

  const [historyVisible, setHistoryVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState<ReactElement>();

  // Calls the prediction API
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

  // The first time the user enters the page, run a prediction with the default configuration
  const isFirstRun = Object.keys(router.query).includes("first-run");
  useEffect(() => {
    if (isFirstRun) {
      router.replace({ query: {} });
      predictAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        apiPredictionAction={predictAction}
        canPredict={!historyVisible}
        historyOnClick={() => setHistoryVisible(!historyVisible)}
      />
      <CContainer fluid>
        {historyVisible ? (
          <ModelHistory
            closeSelf={() => {
              setHistoryVisible(false);
              predictAction();
            }}
          />
        ) : (
          <CRow>
            <CCol sm={3}>
              <PredictionWizardCard className="mb-2" />
              <PredictionBuilder />
            </CCol>
            <CCol style={{ position: "relative" }}>
              {status === "loading" && (
                <LoadingOverlay msg={"Generating your forecast..."} />
              )}
              {predictionData && predictionData.status === "ok" && (
                <PredictionChart
                  targetColumn={targetColumn}
                  forecast={predictionData.forecast}
                  numForecasts={predictionData?.configuration?.forecasts}
                  showUncertainty={true}
                  showEvents={true}
                  showTrend={false}
                  confidenceLevel={20}
                />
              )}
            </CCol>
          </CRow>
        )}
        <CToaster push={errorMessage} placement="bottom-end" />
      </CContainer>
    </>
  );
}
