import { colors } from "../../src/colors";
import { capitalize } from "../../src/helpers";
import PlotlyChart from "../Plotly";

const filterColumns = (columns: string[]) =>
  columns.filter((column) =>
    [
      "residual1",
      "yhat1",
      "season_daily",
      "season_weekly",
      "season_yearly",
      "trend",
      "y",
    ].includes(column)
  );

const columnRenameMap = {
  // y: "Actual",
  // yhat1: "Prediction",
  season_daily: "Seasonality (Daily)",
  season_weekly: "Seasonality (Weekly)",
  season_yearly: "Seasonality (Yearly)",
  // residual1: "Error (Residual)",
} as Record<string, string>;
const renameColumn = (column: string) =>
  Object.keys(columnRenameMap).includes(column)
    ? columnRenameMap[column]
    : column;

const transformPredictionData = (forecast: any): Plotly.Data[] => {
  const columnHeaders = Object.keys(forecast).filter((item) => item !== "ds");
  const x = Object.values(forecast.ds);

  const res = columnHeaders.map((columnHeader) => ({
    type: "scattergl",
    mode: "lines",
    name: capitalize(renameColumn(columnHeader)),
    y: Object.values(forecast[columnHeader]),
    x,
  })) as Plotly.Data[];

  return res;
};

const PredictionChart = ({ predictionData }: { predictionData: any }) => (
  <PlotlyChart
    useResizeHandler
    data={transformPredictionData(predictionData.forecast)}
    layout={{
      hovermode: "x",
      showlegend: true,
      legend: { orientation: "h", y: -0.05 },
      margin: { t: 10, r: 30 }, // b: 10, l: 30, pad: 10
    }}
    config={{
      responsive: true,
    }}
    style={{ width: "100%", minHeight: "85vh" }}
  />
);

export default PredictionChart;
