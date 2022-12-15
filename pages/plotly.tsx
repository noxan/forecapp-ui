import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import dynamic from "next/dynamic";
import { selectTargetColumn, selectTimeColumn } from "../src/store/selectors";
import { isColumnValid } from "../src/definitions";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function Plotly() {
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
  const y = datasets.raw.map((item: any) => item[targetColumn]);

  const data = [
    {
      x,
      y,
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
