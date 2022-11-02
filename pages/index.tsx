import { useEffect, useState } from "react";
import * as danfo from "danfojs";

import Table from "../components/Table";

export default function Home() {
  console.log("Home");
  const [dataset, setDataset] = useState<undefined | danfo.DataFrame>();

  useEffect(() => {
    async function fetchData() {
      const df = await danfo.readCSV("/datasets/energy_dataset_small.csv");
      setDataset(df);
    }
    console.log("useEffect");
    if (!dataset) {
      fetchData();
    }
  });

  if (!dataset) {
    return <div>Loading</div>;
  }

  console.log(dataset);

  return (
    <div>
      <Table initialData={dataset} />
    </div>
  );
}

// Home.getInitialProps = async () => {
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
