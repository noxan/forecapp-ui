import { useAppSelector } from "../src/hooks";
import { capitalize, transformDataset } from "../src/helpers";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import {
  selectDataset,
  selectModelConfiguration,
  selectStatus,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { validateColumnDefinitions } from "../src/definitions";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import { vars } from "../components/Navigation";
import dynamic from "next/dynamic";

const PlotlyChart = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <>Loading chart...</>,
});

const placeholderText = (
  <>
    <strong>This is the first item&apos;s accordion body.</strong> It is hidden
    by default, until the collapse plugin adds the appropriate classes that we
    use to style each element. These classes control the overall appearance, as
    well as the showing and hiding via CSS transitions. You can modify any of
    this with custom CSS or overriding our default variables. It&apos;s also
    worth noting that just about any HTML can go within the{" "}
    <code>.accordion-body</code>, though the transition does limit overflow.
  </>
);

export default function Visualization() {
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector(selectStatus);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const columns = useAppSelector((state) => state.datasets.columns);
  const {
    forecast: predictionForecast,
    metrics: predictionMetrics,
    status: predictionStatus,
  } = useAppSelector((state) => state.datasets.prediction);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }
  if (!validateColumnDefinitions(timeColumn, targetColumn)) {
    return <MissingColumnPlaceholder />;
  }

  const finalDataset = transformDataset(dataset, modelConfiguration, columns);

  const x = dataset.map((item: any) => item[timeColumn]);
  const columnHeaders = Object.keys(dataset[0]).filter(
    (item: any) => item !== timeColumn
  );
  const data = columnHeaders
    .filter((item) => item === targetColumn)
    .map((columnHeader) => ({
      type: "scattergl",
      mode: "lines",
      x,
      y: dataset.map((item: any) => item[columnHeader]),
      name: capitalize(columnHeader),
      visible: columnHeader === targetColumn ? true : "legendonly",
    })) as Plotly.Data[];

  // TODO: Map prediction data to chart
  // const data = prediction.map((column: string) => ({
  // }));

  return (
    <>
      <CHeader position="sticky" className="mb-4" style={vars}>
        <CContainer fluid>
          <CHeaderBrand className="mx-auto d-md-none">Header</CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink>Explore dataset</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>Adjust parameters</CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              <CNavLink>Scores</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>History</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>Export</CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>
      <CContainer fluid>
        <CRow>
          <CCol sm={3}>
            <CCard className="mb-2">
              <CCardBody>
                <CCardTitle>Card title</CCardTitle>
                <CCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </CCardText>
                <CButton href="#">Go somewhere</CButton>
              </CCardBody>
            </CCard>
            <CAccordion activeItemKey={1}>
              {new Array(10).fill(0).map((_, index) => (
                <CAccordionItem key={index} itemKey={index + 1}>
                  <CAccordionHeader>
                    Accordion Item #{index + 1}
                  </CAccordionHeader>
                  <CAccordionBody>{placeholderText}</CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          </CCol>
          <CCol>
            <h1>Forecast</h1>
            <PlotlyChart
              useResizeHandler
              data={data}
              layout={{
                hovermode: "x",
                showlegend: true,
                legend: { orientation: "h" },
              }}
              config={{
                responsive: true,
              }}
              style={{ width: "100%", minHeight: "85vh" }}
            />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
