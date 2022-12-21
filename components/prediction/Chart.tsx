import iwanthue from "iwanthue";
import dynamic from "next/dynamic";
import { capitalize } from "../../src/helpers";

const PlotlyChart = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading chart...</>,
});

// const x = dataset.map((item: any) => item[timeColumn]);
const colors = iwanthue(20);

const transformPredictionData = (prediction: any[]): Plotly.Data[] => {
  const columnHeaders = Object.keys(prediction[0]).splice(1);
  // TODO: Filter non relevant prediction return columns
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
      legend: { orientation: "h" },
    }}
    config={{
      responsive: true,
    }}
    style={{ width: "100%", minHeight: "85vh" }}
  />
);

export default PredictionChart;
