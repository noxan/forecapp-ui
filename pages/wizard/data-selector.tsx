import DatasetTablePreview from "../../components/DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "../../components/DatasetExplorer/DatasetVisualize";
import { useAppSelector } from "../../src/hooks";
import { setTimeColumn, setTargetColumn } from "../../src/store/datasets";
import {
  selectTimeColumn,
  selectTargetColumn,
} from "../../src/store/selectors";

export default function WizardDataSelectorPage() {
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  return (
    <div className="row">
      <div className="col-12 justify-content-start">
        <DatasetTablePreview
          timeColumn={timeColumn}
          setTimeColumn={setTimeColumn}
          targetColumn={targetColumn}
          setTargetColumn={setTargetColumn}
        ></DatasetTablePreview>
        <DatasetVisualize />
      </div>
    </div>
  );
}
