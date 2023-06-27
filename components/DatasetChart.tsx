import { capitalize } from "../src/helpers";
import PlotlyChart from "./Plotly";

export default function DatasetChart({
  dataset,
  timeColumn,
  targetColumn,
  showLegend = true,
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
    visible: columnHeader === targetColumn ? true : "legendonly",
  })) as Plotly.Data[];

  return (
    <PlotlyChart
      useResizeHandler
      data={data}
      layout={{
        hovermode: "x",
        showlegend: showLegend,
        legend: { orientation: "h" },
      }}
      config={{
        responsive: true,
      }}
      style={{ width: "100%", minHeight: "90vh" }}
    />
  );
}
