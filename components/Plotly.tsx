import dynamic from "next/dynamic";

const PlotlyChart = dynamic(
  async () => {
    const createPlotComponent = await import("react-plotly.js/factory");
    const Plotly = require("plotly.js-gl2d-dist");
    return createPlotComponent.default(Plotly);
  },
  {
    ssr: false,
    loading: () => <>Loading chart...</>,
  }
);

export default PlotlyChart;
