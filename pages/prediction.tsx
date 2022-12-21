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

export default function Visualization() {
  const dispatch = useAppDispatch();
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector(selectStatus);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const columns = useAppSelector((state) => state.datasets.columns);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const predictionData = useAppSelector((state) => state.datasets.prediction);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }
  if (!validateColumnDefinitions(timeColumn, targetColumn)) {
    return <MissingColumnPlaceholder />;
  }

  return (
    <>
      <PredictionNavigation
        metrics={predictionData?.metrics}
        status={status}
        apiPredictionAction={() =>
          dispatch(
            apiPrediction({
              dataset: transformDataset(dataset, modelConfiguration, columns),
              configuration: modelConfiguration,
            })
          )
        }
      />
      <CContainer fluid>
        <CRow>
          <CCol sm={3}>
            <PredictionWizardCard className="mb-2" />
            <PredictionBuilder />
          </CCol>
          <CCol style={{ position: "relative" }}>
            <h1>Forecast</h1>
            {status === "loading" && <LoadingOverlay />}
            <PredictionChart predictionData={predictionData} />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
