import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function Visualization() {
  const datasets = useAppSelector((state) => state.datasets);

  if (!datasets.raw) {
    return <MissingDatasetPlaceholder />;
  }

  // const chartData = transformDatasetForChart(datasets.raw);

  const x = datasets.raw.map((item: any) => item["time"]);
  const dataset = datasets.raw.map((item: any) => item["price actual"]);

  const data = [
    {
      x,
      y: dataset,
      type: "scattergl",
      mode: "lines",
    },
  ] as Plotly.Data[];
  const layout = { autosize: true };

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Plotly</h1>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer fluid>
        <CRow className="my-2">
          <CCol>
            <Plot
              useResizeHandler
              data={data}
              layout={layout}
              style={{ width: "100%", minHeight: "90vh" }}
            />
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
