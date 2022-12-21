import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { validateColumnDefinitions } from "../src/definitions";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";
import DatasetChart from "../components/DatasetChart";

export default function Visualization() {
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }
  if (!validateColumnDefinitions(timeColumn, targetColumn)) {
    return <MissingColumnPlaceholder />;
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
            <DatasetChart
              dataset={dataset}
              timeColumn={timeColumn}
              targetColumn={targetColumn}
            />
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
