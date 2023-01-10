import { useAppSelector } from "../src/hooks";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { validateColumnDefinitions } from "../src/definitions";
import { CCol, CContainer, CRow } from "@coreui/react";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";
import PlotlyChart from "../components/Plotly";
import LinkButton from "../components/LinkButton";

export default function Visualization() {
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const predictionData = useAppSelector((state) => state.datasets.prediction);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }
  if (!validateColumnDefinitions(timeColumn, targetColumn)) {
    return <MissingColumnPlaceholder />;
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Explain forecast parameters</h1>
          <LinkButton href="/prediction" variant="outline">
            Back to prediction
          </LinkButton>
          <PlotlyChart
            useResizeHandler
            data={[...predictionData.explainable?.parameters.data]}
            layout={Object.assign(
              {},
              predictionData.explainable?.parameters.layout
            )}
            config={{
              responsive: true,
            }}
            style={{ width: "100%", minHeight: "95vh" }}
          />
        </CCol>
      </CRow>
    </CContainer>
  );
}
