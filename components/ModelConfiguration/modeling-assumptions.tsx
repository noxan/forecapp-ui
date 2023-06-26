import {
  autoRegressionExplanation,
  laggedRegressorsExplanation,
  laggedRegressorsDocumnentationLink,
  autoRegressionDocumentationLink,
} from "../../components/ModelConfiguration/ConfigExplanations";
import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import {
  selectModelConfiguration,
  selectDataset,
  selectTimeColumn,
  selectTargetColumn,
} from "../../src/store/selectors";
import { CFormInput, CFormRange } from "@coreui/react";
import LaggedRegressorBuilder from "../../components/prediction/LaggedRegressorBuilder";
import { validateModelParameterSection } from "../../src/schemas/modelParameters";

const parseStringToNumber = (value: string) =>
  value === "" ? null : Number(value);

export default function ModelingAssumptions() {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();
  const dataset = useAppSelector(selectDataset);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const columnHeaders = Object.keys(dataset[0]);
  const laggedRegressorColumns = columnHeaders.filter(
    (column) => column !== timeColumn && column !== targetColumn
  );
  const { autoregression } = validateModelParameterSection(
    modelConfiguration,
    "modeling-assumptions"
  );
  return (
    <div data-section id="modeling-assumptions">
      <h2 className="mb-4">Modeling Assumptions</h2>
      <ConfigurationCard
        explanation={autoRegressionExplanation}
        title="Auto Regression"
        documentationLink={autoRegressionDocumentationLink}
      >
        <CFormInput
          className="mb-4"
          type="number"
          placeholder="Number of lags"
          min={0}
          defaultValue={modelConfiguration.autoregression.lags}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                autoregression: { lags: parseStringToNumber(e.target.value) },
              })
            )
          }
          valid={autoregression.lags.valid}
          invalid={!autoregression.lags.valid}
          feedbackValid=""
          feedbackInvalid={autoregression.lags.error}
        />
      </ConfigurationCard>
      <ConfigurationCard
        explanation={laggedRegressorsExplanation}
        title="Lagged regressors"
        documentationLink={laggedRegressorsDocumnentationLink}
      >
        <LaggedRegressorBuilder
          laggedRegressorColumns={laggedRegressorColumns}
          modelConfiguration={modelConfiguration}
          updateConfig={(config: any) => dispatch(editModelConfig(config))}
        ></LaggedRegressorBuilder>
      </ConfigurationCard>
    </div>
  );
}
