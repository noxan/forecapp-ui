import { ReactElement, useEffect, useRef, useState } from "react";
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
  CProgress,
  CProgressBar,
} from "@coreui/react";
import PredictionNavigation from "../components/prediction/Navigation";
import PredictionWizardCard from "../components/prediction/WizardCard";
import PredictionBuilder from "../components/prediction/Builder";
import { apiPrediction } from "../src/store/datasets";
import PredictionChart from "../components/prediction/Chart";
import LoadingOverlay from "../components/prediction/LoadingOverlay";
import MissingForecastPlaceholder from "../components/MissingForecastPlaceholder";
import { useRouter } from "next/router";
import { ModelParameters } from "../src/schemas/modelParameters";
import { HTTPError, ValidationError, NeuralProphetError } from "../src/error";
import { ZodError } from "zod";

export type WebSocketMessage = {
  type: "Progress" | "ForecastResult";
  data: any;
};

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

  const usingWS = useRef(false);
  const websocket = useRef(new WebSocket("ws://localhost:8000/prediction"));
  const [progress, setProgress] = useState(0);

  function handlePredictionMessage(event: MessageEvent<any>) {
    const msg = JSON.parse(event.data) as WebSocketMessage;
    switch (msg.type) {
      case "Progress":
        setProgress(msg.data);
        break;
      case "ForecastResult":
        break;
    }
  }

  useEffect(() => {
    websocket.current.onerror = (e) => {
      usingWS.current = false;
      setErrorMessage(
        errorToastWithMessage("WebSocket connection failed: " + e.type)
      );
    };
    websocket.current.onopen = (_) => {
      console.log("Websocket open.");
      usingWS.current = true;
      const datasetMessage = {
        type: "Dataset",
        data: dataset,
      };
      websocket.current.send(JSON.stringify(datasetMessage));
    };
    websocket.current.onclose = (_) => {
      console.log("Websocket closed.");
      usingWS.current = false;
    };
    websocket.current.onmessage = handlePredictionMessage;

    return () => {
      if (usingWS.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        websocket.current.close();
        usingWS.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // check that form inputs are valid before calling api
      ModelParameters.parse(modelConfiguration);
      // then call api
      if (usingWS.current) {
        websocket.current.send(
          JSON.stringify({ type: "Configuration", data: modelConfiguration })
        );
      } else {
        await dispatch(
          apiPrediction({
            dataset: transformDataset(dataset, modelConfiguration, columns),
            configuration: modelConfiguration,
          })
        ).unwrap();
      }
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
            {status === "loading" && (
              <CProgress className="mb-3">
                <CProgressBar value={progress} />
              </CProgress>
            )}
          </CCol>
        </CRow>
        <CToaster push={errorMessage} placement="bottom-end" />
      </CContainer>
    </>
  );
}
