import Plot from "react-plotly.js";
import { capitalize } from "../src/helpers";

export default function PlotlyChart({
  dataset,
  timeColumn,
  targetColumn,
}: any) {
  const x = dataset.map((item: any) => item[timeColumn]);
  const columnHeaders = Object.keys(dataset[0]).filter(
    (item: any) => item !== timeColumn
  );
  const data = columnHeaders.map((columnHeader) => ({
    type: "scattergl",
    mode: "lines",
    x,
    y: dataset.map((item: any) => item[columnHeader]),
    name: capitalize(columnHeader),
  })) as Plotly.Data[];

  const y = dataset.map((item: any) => item[targetColumn]);
  return (
    <Plot
      useResizeHandler
      data={data}
      layout={{
        autosize: true,
        hovermode: "closest",
      }}
      config={{
        responsive: true,
      }}
      style={{ width: "100%", minHeight: "90vh" }}
    />
  );
}
