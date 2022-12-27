import { CBadge, CTabContent, CTabPane } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import iwanthue from "iwanthue";
import {
  COLUMN_PRIMARY_TARGET,
  COLUMN_PRIMARY_TIME,
  SPECIAL_COLUMN_CONFIGURATIONS,
} from "../src/definitions";
import { capitalize, generateChartFormatForSeries } from "../src/helpers";
import ColumnHistogram from "./ColumnHistogram";

const chartColor = iwanthue(1)[0];

const ColumnConfigPanel = ({
  column,
  dataset,
  timeColumn,
  targetColumn,
}: {
  column: string;
  dataset: any[];
  timeColumn: string;
  targetColumn: string;
}) => {
  const specialColumnMapping =
    column === timeColumn
      ? COLUMN_PRIMARY_TIME
      : column === targetColumn
      ? COLUMN_PRIMARY_TARGET
      : false;
  const specialColumn = specialColumnMapping
    ? SPECIAL_COLUMN_CONFIGURATIONS[specialColumnMapping]
    : false;

  const rows = dataset.map((row: any) => row[column]);
  const timeLabels = dataset.map((row: any) => row[timeColumn]);

  return (
    <CTabContent>
      <CTabPane visible>
        <h3 style={{ display: "inline-block" }}>{capitalize(column)}</h3>
        {specialColumn && (
          <CBadge color="primary" className="mx-2">
            {specialColumn.label}
          </CBadge>
        )}
        <h4>Data series</h4>
        <CChartLine
          data={generateChartFormatForSeries(
            timeLabels,
            capitalize(column),
            rows,
            chartColor
          )}
        />
        <h4>Value distribution</h4>
        <ColumnHistogram rows={rows} chartColor={chartColor} />
      </CTabPane>
    </CTabContent>
  );
};

export default ColumnConfigPanel;
