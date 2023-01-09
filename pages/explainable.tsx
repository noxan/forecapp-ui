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
    <CContainer fluid>
      <CRow>
        <CCol>
          <h1>Explainable</h1>
          <PlotlyChart
            useResizeHandler
            data={predictionData.explainable?.components.data}
            layout={predictionData.explainable?.components.layout}
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
