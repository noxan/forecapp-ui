import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import { transformDataset } from "../src/helpers";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import Prediction from "../components/Prediction";
import {
  selectDataset,
  selectModelConfiguration,
  selectStatus,
} from "../src/store/selectors";

export default function Visualization() {
  const dataset = useAppSelector(selectDataset);
  const status = useAppSelector(selectStatus);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const { columns, prediction } = useAppSelector((state) => state.datasets);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  const finalDataset =
    dataset && columns
      ? transformDataset(dataset, modelConfiguration, columns)
      : undefined;

  return (
    <Layout>
      {finalDataset && (
        <Prediction
          finalDataset={finalDataset}
          modelConfiguration={modelConfiguration}
          prediction={prediction}
          status={status}
        />
      )}
    </Layout>
  );
}
