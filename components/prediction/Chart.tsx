import dynamic from "next/dynamic";
import { colors } from "../../src/colors";
import { capitalize } from "../../src/helpers";

const PlotlyChart = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading chart...</>,
});

// const x = dataset.map((item: any) => item[timeColumn]);

const transformPredictionData = (prediction: any[]): Plotly.Data[] => {
  // TODO: Filter non relevant prediction return columns
  const columnHeaders = Object.keys(prediction[0]).splice(1);

  return columnHeaders.map((columnHeader, index) => ({
    type: "scattergl",
    mode: "lines",
    marker: {
      color: colors[index],
    },
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
