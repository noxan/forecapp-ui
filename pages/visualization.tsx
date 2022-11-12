import { CChartLine } from "@coreui/react-chartjs";
import { CCol, CContainer, CRow } from "@coreui/react";
import Link from "next/link";
import iwanthue from "iwanthue";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import { capitalize } from "../src/helpers";

const transformDatasetForChart = (dataset: any[]) => {
  const headers = Object.keys(dataset[0]).splice(1);

  // TODO: remove hard coded "time" index
  const timeLabels = dataset.slice(1).map((item) => item.time || item.ds);

  const colorPalette = iwanthue(headers.length);

  return {
    labels: timeLabels,
    datasets: headers.map((header, index) => ({
      label: capitalize(header),
      data: dataset.map((item) => item[header]),
      backgroundColor: colorPalette[index],
      borderColor: colorPalette[index],
    })),
  };
};

export default function Visualization() {
  const datasets = useAppSelector((state) => state.datasets);

  if (!datasets) {
    return (
      <Layout>
        <Link href="/">Import dataset first</Link>
      </Layout>
    );
  }

  const chartData = transformDatasetForChart(datasets.raw);

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Visualization</h1>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <CChartLine type="line" data={chartData} />
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
