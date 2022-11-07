import { useEffect, useState } from "react";
import * as danfo from "danfojs";

import Table from "../../components/experiments/Table";

export default function Dataset() {
  console.log("Dataset");
  const [dataset, setDataset] = useState<undefined | danfo.DataFrame>();

  useEffect(() => {
    async function fetchData() {
      const df_1 = await danfo.readCSV("/datasets/energy_dataset_small.csv");

      const df = df_1.setIndex({ column: "time" });

      setDataset(df);

      const columns2 = df.columns.filter((col) => col !== "time");

      df.plot("plot_div").line({ config: { columns: columns2 } });
    }
    console.log("useEffect");
    if (!dataset) {
      fetchData();
    }
  });

  if (!dataset) {
    return (
      <div>
        <div id="plot_div"></div>Loading
      </div>
    );
  }

  console.log(dataset);

  return (
    <div>
      <div id="plot_div"></div>
      <Table initialData={dataset} />
    </div>
  );
}

// Dataset.getInitialProps = async () => {
//   console.log("getInitialProps");
//   if (typeof window !== "undefined") {
//     const danfo = await import("danfojs");
//     const df = await danfo.readCSV("/datasets/energy_dataset.csv");
//     return { df };
//   } else {
//     const danfo = await import("danfojs-node");
//     const df = await danfo.readCSV("public/datasets/energy_dataset.csv");
//     return { df: danfo.toJSON(df, { format: "row" }) };
//   }
// };
