import { useAppSelector } from "../src/hooks";
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

const PlotlyChart = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading chart...</>,
});

type Metrics = {
  [key: string]: number;
};

export default function Visualization() {
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector(selectStatus);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const columns = useAppSelector((state) => state.datasets.columns);
  const { status: predictionStatus, data: predictionData } = useAppSelector(
    (state) => state.datasets.prediction
  );
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

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
  const data = columnHeaders
    .filter((item) => item === targetColumn)
    .map((columnHeader) => ({
      type: "scattergl",
      mode: "lines",
      x,
      y: dataset.map((item: any) => item[columnHeader]),
      name: capitalize(columnHeader),
      visible: columnHeader === targetColumn ? true : "legendonly",
    })) as Plotly.Data[];

  const metrics = {
    Loss: {
      "0": 0.4313843113067464,
      "1": 0.07083476524045039,
      "2": 0.04240324271942485,
    },
    MAE: {
      "0": 33.859524793585635,
      "1": 12.581460394486479,
      "2": 10.439013243702703,
    },
    RMSE: {
      "0": 42.255662576651865,
      "1": 15.2941816235766,
      "2": 12.663606023592223,
    },
    RegLoss: {
      "0": 0.0,
      "1": 0.0,
      "2": 0.0,
    },
    SmoothL1Loss: {
      "0": 0.5727956983348961,
      "1": 0.09276482564926056,
      "2": 0.06282282909646691,
    },
  };
  const getLatestMetrics = (metrics: any) =>
    Object.keys(metrics).reduce((obj: Metrics, key: keyof Metrics) => {
      const metric = Object.values(metrics[key]);
      obj[key] = metric.slice(-1)[0] as number;
      return obj;
    }, {});

  // TODO: Map prediction data to chart
  // const data = prediction.map((column: string) => ({
  // }));

  return (
    <>
      <PredictionNavigation metrics={getLatestMetrics(metrics)} />
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
              data={data}
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
