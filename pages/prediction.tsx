import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import { transformDataset } from "../src/helpers";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import Prediction from "../components/Prediction";
import {
  selectDataset,
  selectModelConfiguration,
  selectStatus,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { validateColumnDefinitions } from "../src/definitions";
import MissingColumnPlaceholder from "../components/MissingColumnPlaceholder";

export default function Visualization() {
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector(selectStatus);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const { columns, prediction } = useAppSelector((state) => state.datasets);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }
  if (!validateColumnDefinitions(timeColumn, targetColumn)) {
    return <MissingColumnPlaceholder />;
  }

  const finalDataset = transformDataset(dataset, modelConfiguration, columns);

  return (
    <Layout>
      <Prediction
        finalDataset={finalDataset}
        modelConfiguration={modelConfiguration}
        prediction={prediction}
        status={status}
      />
    </Layout>
  );
}
