import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import dynamic from "next/dynamic";
import { selectTargetColumn, selectTimeColumn } from "../src/store/selectors";
import { isColumnValid } from "../src/definitions";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";
import { capitalize } from "../src/helpers";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  // suspense: true,
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

  const x = datasets.raw.map((item: any) => item[timeColumn]);
  const columnHeaders = Object.keys(datasets.raw[0]).filter(
    (item: any) => item !== timeColumn
  );

  const data = columnHeaders.map((columnHeader) => ({
    type: "scattergl",
    mode: "lines",
    x,
    y: datasets.raw.map((item: any) => item[columnHeader]),
    name: capitalize(columnHeader),
  }));
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
