import Layout from "../components/Layout";
import { useAppSelector } from "../src/hooks";
import { transformDataset } from "../src/helpers";
import MissingDatasetPlaceholder from "../components/MissingDatasetPlaceholder";
import Prediction from "../components/Prediction";

export default function Visualization() {
  const datasets = useAppSelector((state) => state.datasets);
  const modelConfiguration = useAppSelector((state) => state.models);

  if (!datasets.raw) {
    return <MissingDatasetPlaceholder />;
  }

  const finalDataset =
    datasets.raw && datasets.columns
      ? transformDataset(datasets.raw, modelConfiguration, datasets.columns)
      : undefined;

  return (
    <Layout>
      {finalDataset && (
        <Prediction
          finalDataset={finalDataset}
          modelConfiguration={modelConfiguration}
          prediction={datasets.prediction}
          status={datasets.status}
        />
      )}
    </Layout>
  );
}
