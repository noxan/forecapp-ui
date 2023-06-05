import DatasetTablePreview from "./DatasetTablePreview";
import DatasetVisualize from "./DatasetVisualize";

export default function DatasetPreview({
  timeColumn,
  setTimeColumn,
  targetColumn,
  setTargetColumn,
}: {
  timeColumn: string;
  setTimeColumn: Function;
  targetColumn: string;
  setTargetColumn: Function;
}) {
  return (
    <div className="dataset-preview-layout">
      <DatasetTablePreview
        timeColumn={timeColumn}
        setTimeColumn={setTimeColumn}
        targetColumn={targetColumn}
        setTargetColumn={setTargetColumn}
      />
      <DatasetVisualize />
    </div>
  );
}
