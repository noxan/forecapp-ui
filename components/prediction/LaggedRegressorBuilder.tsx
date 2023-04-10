import { CBadge, CFormSelect } from "@coreui/react";
import { capitalize } from "../../src/helpers";
import { LaggedRegressorState, ModelState } from "../../src/store/models";
import { time } from "console";

type LaggedRegressorBuilderProps = {
  laggedRegressorColumns: string[];
  modelConfiguration: ModelState;
  updateConfig: (config: any) => void;
};

const LaggedRegressorBuilder = ({
  laggedRegressorColumns,
  modelConfiguration,
  updateConfig,
}: LaggedRegressorBuilderProps) => (
  <>
    <div>
      {modelConfiguration?.laggedRegressors.map(
        (laggedRegressor: any, index: number) => (
          <CBadge
            key={`${laggedRegressor.name}-${index}`}
            color="secondary"
            style={{ cursor: "not-allowed", marginRight: "0.25rem" }}
            onClick={() =>
              updateConfig({
                laggedRegressors: (
                  modelConfiguration?.laggedRegressors || []
                ).filter((item: any) => item.name !== laggedRegressor.name),
              })
            }
          >
            {capitalize(laggedRegressor.name)}
          </CBadge>
        )
      )}
    </div>
    <CFormSelect
      className="mt-2"
      onChange={async (evt) => {
        const value = evt.target.value;
        if (value !== "Add regressor column") {
          if (modelConfiguration?.laggedRegressors.filter((item : LaggedRegressorState) => item.name === value).length == 0) {
            await updateConfig({
              laggedRegressors: [
                { name: value, lags: 3, regularization: 0.1, normalization: "auto" },
                ...(modelConfiguration?.laggedRegressors || []),
              ],
            });
          }
          evt.target.value = "Add regressor column";
        }
      }}
    >
      <option>Add regressor column</option>
      {laggedRegressorColumns.map((column: any) => (
        <option key={column} value={column}>
          {capitalize(column)}
        </option>
      ))}
    </CFormSelect>
  </>
);

export default LaggedRegressorBuilder;

{
  /* <CFormSelect>
  <option value="0">Select a column...</option>
  {columnHeaders
    .filter((column) => column !== timeColumn && column !== targetColumn)
    .map((column) => (
      <option key={column} value={column}>
        {column}
      </option>
    ))}
</CFormSelect>; */
}
