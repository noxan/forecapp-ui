// import "chart.js/auto";
import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { CChart } from "@coreui/react-chartjs";
import { AppDispatch } from "../src/store";
import { importDataset } from "../src/store/datasets";
import Layout from "../components/Layout";
import { useRef } from "react";

const exampleDatasets = [
  "datasets/energy_dataset_small.csv",
  "datasets/air_passengers.csv",
];

export default function Home() {
  const ref = useRef();
  const datasets = useSelector((state: any) => state.datasets);
  const isLoading = datasets.status === "loading";
  const dispatch = useDispatch<AppDispatch>();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <h1>Dataset</h1>
          {exampleDatasets.map((exampleDatasetUrl) => (
            <CCol key={exampleDatasetUrl}>
              <CButton
                onClick={() =>
                  dispatch(importDataset({ url: exampleDatasetUrl }))
                }
                disabled={isLoading}
              >
                Load {exampleDatasetUrl}
              </CButton>
            </CCol>
          ))}
        </CRow>
        <CRow>
          <CCol>{datasets.status}</CCol>
          {datasets.raw && (
            <CCol>
              <pre>{JSON.stringify(datasets.raw.slice(0, 5))}</pre>
            </CCol>
          )}
        </CRow>
      </CContainer>
      <CContainer>
        <CRow className="my-2">
          <h1>Visualization</h1>
          <CChart data={data} type={"line"} ref={ref} />
        </CRow>
      </CContainer>
    </Layout>
  );
}
