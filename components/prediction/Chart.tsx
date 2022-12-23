import { colors } from "../../src/colors";
import { capitalize } from "../../src/helpers";
import PlotlyChart from "../Plotly";

// const x = dataset.map((item: any) => item[timeColumn]);

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
  y: "Actual",
  yhat1: "Prediction",
  season_daily: "Seasonality (Daily)",
  season_weekly: "Seasonality (Weekly)",
  season_yearly: "Seasonality (Yearly)",

  residual1: "Error (Residual)",
} as Record<string, string>;
const renameColumn = (column: string) =>
  Object.keys(columnRenameMap).includes(column)
    ? columnRenameMap[column]
    : column;

const transformPredictionData = (prediction: any[]): Plotly.Data[] => {
  // TODO: Filter non relevant prediction return columns
  const columnHeaders = Object.keys(prediction[0]).splice(1);

  const lastForecastColumn = columnHeaders
    .filter((columnHeader) => columnHeader.startsWith("yhat"))
    .map((columnHeader) => parseInt(columnHeader.replace("yhat", ""), 10))
    .sort((a, b) => b - a)[0];

  return filterColumns(columnHeaders).map((columnHeader, index) => ({
    type: "scattergl",
    mode: "lines",
    marker: {
      color: colors[index] + "cc",
    },
    // TODO: Add meaningful time values for x-axis
    // x,
    y: (() => {
      // TOOD: Clean up this mess: merges yhat_1 and yhat_max to have a single prediction
      if (columnHeader === "yhat1" && lastForecastColumn > 1) {
        return prediction.map((item: any, index) => {
          if (index > lastForecastColumn) {
            return item[`yhat${lastForecastColumn}`];
          }
          return item[columnHeader];
        });
      }
      return prediction.map((item: any) => item[columnHeader]);
    })(),
    name: capitalize(renameColumn(columnHeader)),
    // visible: ["y", "yhat1"].includes(columnHeader.toLowerCase()) ? true : "legendonly",
  }));
};

const PredictionChart = ({ predictionData }: { predictionData: any }) => (
  <PlotlyChart
    useResizeHandler
    data={transformPredictionData(predictionData.forecast)}
    layout={{
      hovermode: "x",
      showlegend: true,
      legend: { orientation: "h", y: -0.05 },
      margin: { t: 10, b: 10, l: 30, r: 30, pad: 10 },
    }}
    config={{
      responsive: true,
    }}
    style={{ width: "100%", minHeight: "85vh" }}
  />
);

export default PredictionChart;
