import { useAppDispatch, useAppSelector } from "../src/hooks";
import { capitalize, transformDataset } from "../src/helpers";
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
import dynamic from "next/dynamic";
import PredictionNavigation from "../components/prediction/Navigation";
import PredictionWizardCard from "../components/prediction/WizardCard";
import PredictionBuilder from "../components/prediction/Builder";
import { apiPrediction } from "../src/store/datasets";

const PlotlyChart = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading chart...</>,
});

export const transformPredictionData = (prediction: any[]): Plotly.Data[] => {
  const columnHeaders = Object.keys(prediction[0]).splice(1);
  // TODO: Filter non relevant prediction return columns
  return columnHeaders.map((columnHeader) => ({
    type: "scattergl",
    mode: "lines",
    // TODO: Add meaningful time values for x-axis
    // x,
    y: prediction.map((item: any) => item[columnHeader]),
    // TODO: Rename columns
    name: capitalize(columnHeader),
    visible: ["y", "yhat1"].includes(columnHeader.toLowerCase())
      ? true
      : "legendonly",
  }));
};

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

  const finalDataset = transformDataset(dataset, modelConfiguration, columns);

  const x = dataset.map((item: any) => item[timeColumn]);
  const columnHeaders = Object.keys(dataset[0]).filter(
    (item: any) => item !== timeColumn
  );

  return (
    <>
      <PredictionNavigation
        metrics={predictionData?.metrics}
        status={status}
        apiPredictionAction={() =>
          dispatch(
            apiPrediction({
              dataset: finalDataset,
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
          <CCol>
            <h1>Forecast</h1>
            <PlotlyChart
              useResizeHandler
              data={transformPredictionData(predictionData.forecast)}
              layout={{
                hovermode: "x",
                showlegend: true,
                legend: { orientation: "h" },
              }}
              config={{
                responsive: true,
              }}
              style={{ width: "100%", minHeight: "85vh" }}
            />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
