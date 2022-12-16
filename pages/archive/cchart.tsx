import { CChartLine } from "@coreui/react-chartjs";
import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../src/hooks";
import { transformDatasetForChart } from "../../src/helpers";
import MissingDatasetPlaceholder from "../../components/MissingDatasetPlaceholder";

export default function Visualization() {
  const datasets = useAppSelector((state) => state.datasets);

  if (!datasets.raw) {
    return <MissingDatasetPlaceholder />;
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
      </CContainer>
      <CContainer fluid>
        <CRow className="my-2">
          <CCol>
            <CChartLine data={chartData} />
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
