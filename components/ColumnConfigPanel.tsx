import { CBadge, CFormSelect, CTabContent, CTabPane } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import iwanthue from "iwanthue";
import {
  COLUMN_PRIMARY_TARGET,
  COLUMN_PRIMARY_TIME,
  datatypes,
  SELECT_STATE_NONE,
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
  columnConfig,
  setColumnConfig,
}: {
  column: string;
  dataset: any[];
  timeColumn: string;
  targetColumn: string;
  columnConfig: object;
  setColumnConfig: Function;
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
  console.log(dataset);
  const datatypesAutodetected = dataset
    .map((row: any) => typeof row[column])
    .filter(
      (value: any, index: number, self: any) => self.indexOf(value) === index
    );

  const datatypeDefaultValue = datatypes.includes(
    datatypesAutodetected[0] as any
  )
    ? datatypesAutodetected[0]
    : SELECT_STATE_NONE;

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
            <CFormSelect
              label="Datatype"
              defaultValue={datatypeDefaultValue}
              onChange={(evt) =>
                setColumnConfig({
                  datatype: evt.target.value as any,
                })
              }
              options={[
                {
                  label: "Select datatype for column",
                  value: SELECT_STATE_NONE,
                },
                ...datatypes.map((datatype) => ({
                  label:
                    capitalize(datatype) +
                    (datatypeDefaultValue === datatype
                      ? " (auto detected)"
                      : ""),
                  value: datatype,
                })),
              ]}
            />
          </>
        )}
        <div>
          Output column name:{" "}
          {specialColumn ? specialColumn.outputName : "unknown"}
        </div>
        <h4>Data series</h4>
        <CChartLine
          data={generateChartFormatForSeries(
            dataset.map((row: any) => row[timeColumn]),
            capitalize(column),
            dataset.map((row: any) => row[column]),
            chartColor
          )}
          type={"line"}
        />
        <h4>Value distribution</h4>
        <ColumnHistogram
          rows={dataset.map((row: any) => row[column])}
          chartColor={chartColor}
        />
        <h4>Validation errors</h4>
      </CTabPane>
    </CTabContent>
  );
};

export default ColumnConfigPanel;
