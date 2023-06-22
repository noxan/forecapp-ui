import { CCol, CContainer, CRow } from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import {
  selectDataset,
  selectTargetColumn,
  selectTimeColumn,
} from "../../src/store/selectors";
import DatasetChart from "../DatasetChart";

const DatasetVisualize = ({ showLegend = false }: { showLegend?: boolean }) => {
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

  return (
    <CRow className="my-2">
      <CCol>
        <DatasetChart
          dataset={dataset}
          timeColumn={timeColumn}
          targetColumn={targetColumn}
          showLegend={showLegend}
        />
      </CCol>
    </CRow>
  );
};

export default DatasetVisualize;
