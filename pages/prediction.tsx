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
import PredictionChart from "../components/prediction/Chart";
import LoadingOverlay from "../components/prediction/LoadingOverlay";
import MissingForecastPlaceholder from "../components/MissingForecastPlaceholder";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { ValidationError } from "../src/error";

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

  const [errorMessage, setErrorMessage] = useState<ReactElement>();
  const errorToastWithMessage = (message: string) => {
    return (
      <CToast
        autohide={true}
        color="danger"
        animation={true}
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody>{message}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    );
  };

  // Calls the prediction API
  const predictAction = async () => {
    try {
      await dispatch(
        apiPrediction({
          dataset: transformDataset(dataset, modelConfiguration, columns),
          configuration: modelConfiguration,
        })
      ).unwrap();
    } catch (err: any) {
      if (err.message) {
        setErrorMessage(
          errorToastWithMessage("Something went wrong: " + err.message)
        );
      } else if (err.detail) {
        if (err.detail instanceof Array) {
          const processedError = err as ValidationError;
          setErrorMessage(
            errorToastWithMessage("The model configuration was invalid.")
          );
        } else {
          setErrorMessage(
            errorToastWithMessage("Neural Prophet failed: " + err.detail)
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
            {predictionData && predictionData.status === "ok" && (
              <PredictionChart
                targetColumn={targetColumn}
                predictionData={predictionData}
                forecasts={predictionData?.configuration?.forecasts}
              />
            )}
          </CCol>
        </CRow>
        <CToaster push={errorMessage} placement="bottom-end" />
      </CContainer>
    </>
  );
}
