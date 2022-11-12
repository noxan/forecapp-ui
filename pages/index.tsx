import { CCol, CContainer, CRow } from "@coreui/react";
import Layout from "../components/Layout";
import DatasetImporter from "../components/DatasetImporter";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import ColumnConfiguration from "../components/ColumnConfiguration";
import Prediction from "../components/Prediction";
import { transformDataset } from "../src/helpers";
import Table from "../components/Table";

export default function Home() {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const finalDataset =
    state.datasets.raw && state.datasets.columns
      ? transformDataset(state.datasets.raw, state.datasets.columns)
      : undefined;

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Dataset</h1>
          </CCol>
        </CRow>
        <DatasetImporter />
        {state.datasets.raw && <Table data={state.datasets.raw.slice(0, 3)} />}
      </CContainer>
      {state.datasets.raw && <ColumnConfiguration />}
      {finalDataset && (
        <Prediction
          finalDataset={finalDataset}
          columns={state.datasets.columns}
          modelConfiguration={state.models}
          prediction={state.datasets.prediction}
          status={state.datasets.status}
        />
      )}
    </Layout>
  );
}
