import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import dynamic from "next/dynamic";
import { selectTargetColumn, selectTimeColumn } from "../src/store/selectors";
import { isColumnValid } from "../src/definitions";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";

const PlotlyChart = dynamic(() => import("../components/PlotlyChart"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function PlotlyPage() {
  const datasets = useAppSelector((state) => state.datasets);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

  const areColumnsValid =
    isColumnValid(timeColumn) && isColumnValid(targetColumn);

  if (!datasets.raw) {
    return <MissingDatasetPlaceholder />;
  }
  if (!areColumnsValid) {
    return (
      <Layout>
        <CContainer>
          <CRow>
            <CCol>
              <MissingColumnPlaceholder />
            </CCol>
          </CRow>
        </CContainer>
      </Layout>
    );
  }

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
            <PlotlyChart
              dataset={datasets.raw}
              timeColumn={timeColumn}
              targetColumn={targetColumn}
            />
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
