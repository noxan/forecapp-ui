import * as danfo from "danfojs";
import { useEffect } from "react";
// import * as Plotly from "plotly.js";

export default function DanfojsPage() {
  useEffect(() => {
    async function fetchData() {
      // const df = await danfo.readCSV("/datasets/weather_features.csv");
      const df = await danfo.readCSV(
        "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv"
      );
      console.log(df.head(5));

      const config = {
        columns: ["AAPL.Open", "AAPL.Close"], //columns to plot
        displayModeBar: true,
        displaylogo: false,
      };
      const layout = {
        title: "Weather",
        type: "scattergl",
        mode: "lines",
      };
      const Plotly = require("plotly.js");

      const cols = config["columns"];

      const traces: any = [];
      cols.forEach((col) => {
        const x = df.index;
        const y = df[col].values;

        const trace = { x, y, name: col };
        traces.push(trace);
      });

      Plotly.newPlot("plot_div", traces, layout, config);

      // df.plot("plot_div").scatter({ config, layout });
    }
    fetchData();
  }, []);

  return (
    <div>
      danfojs
      <div id="plot_div"></div>
    </div>
  );
}
