import { CRow } from "@coreui/react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

const BrokenChart = (datasets: any) => {
  const previewLength = 2;
  let Chart = <div>Loading or invalid data</div>;
  if (datasets.raw.length > 0) {
    const headers = Object.keys(datasets.raw[0]);

    console.log(headers);
    const visualizationData = {
      x: [1, 2, 3],
      y: [2, 5, 3],
    };
    // datasets.raw
    //   .slice(0, previewLength)
    //   .map((row: any) => {
    //     console.log(row);
    //     return row;
    //   });
    Chart = (
      <Plot
        data={[{ type: "scatter", ...visualizationData }]}
        layout={{ title: "Visualization" }}
      />
    );
  }

  return <CRow className="my-2">{Chart}</CRow>;
};
export default BrokenChart;
