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
  return (
    <div data-section id="modeling-assumptions">
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
        />
        <CFormRange
          min={0}
          max={1}
          step={0.01}
          label={`Regularization (${modelConfiguration.autoregression.regularization})`}
          defaultValue={modelConfiguration.autoregression.regularization}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                autoregression: { regularization: Number(e.target.value) },
              })
            )
          }
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
