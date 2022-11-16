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
  const datatypesAutodetected = dataset
    .map((row: any) => typeof row[column])
    .filter(
      (value: any, index: number, self: any) => self.indexOf(value) === index
    );

  const rows = dataset.map((row: any) => row[column]);
  const timeLabels = dataset.map((row: any) => row[timeColumn]);

  return (
    <CTabContent>
      <CTabPane visible>
        <h3>{capitalize(column)}</h3>
        {specialColumn && (
          <div>
            <CBadge color="primary">{specialColumn.label}</CBadge>
          </div>
        )}
        <h4>Column data type</h4>
        {specialColumn ? (
          <div>Datatype: {specialColumn.datatype}</div>
        ) : (
          <>
            <div>
              Auto detected datatypes: {datatypesAutodetected.join(", ")}
            </div>
          </>
        )}
        <div>
          Output column name:{" "}
          {specialColumn ? specialColumn.outputName : "unknown"}
        </div>
        <h4>Data series</h4>
        <CChartLine
          data={generateChartFormatForSeries(
            timeLabels,
            capitalize(column),
            rows,
            chartColor
          )}
          type={"line"}
        />
        <h4>Value distribution</h4>
        <ColumnHistogram rows={rows} chartColor={chartColor} />
        <h4>Validation errors</h4>
      </CTabPane>
    </CTabContent>
  );
};

export default ColumnConfigPanel;
