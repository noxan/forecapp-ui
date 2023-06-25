import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import { selectModelConfiguration } from "../../src/store/selectors";
import { CFormInput, CFormCheck } from "@coreui/react";
import {
  batchSizesExplanation,
  epochsExplanation,
  learningRateExplanation,
} from "../../components/ModelConfiguration/ConfigExplanations";
import { validateModelParameterSection } from "../../src/schemas/modelParameters";

const parseStringToNumber = (value: string) =>
  value === "" ? null : Number(value);

export default function TrainingConfiguration() {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();
  const { training } = validateModelParameterSection(
    modelConfiguration,
    "training-configuration"
  );
  return (
    <div data-section id="training-configuration">
      <h2 className="mb-4">Training Configuration</h2>
      <ConfigurationCard
        explanation={epochsExplanation}
        documentationLink=""
        title="Epochs"
      >
        <CFormInput
          type="number"
          placeholder="auto"
          min={1}
          defaultValue={modelConfiguration.training.epochs}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                training: {
                  epochs: parseStringToNumber(e.target.value),
                },
              })
            )
          }
          valid={training.epochs.valid}
          invalid={!training.epochs.valid}
          feedbackValid=""
          feedbackInvalid={training.epochs.error}
        />
        <CFormCheck
          id="earlyStopping"
          label="Stop training early if no improvement is seen"
          defaultChecked={modelConfiguration.training.earlyStopping}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                training: { earlyStopping: e.target.checked },
              })
            )
          }
        />
      </ConfigurationCard>
      <ConfigurationCard
        explanation={learningRateExplanation}
        documentationLink=""
        title="Learning rate"
      >
        <CFormInput
          type="number"
          placeholder="auto"
          defaultValue={modelConfiguration.training.learningRate}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                training: {
                  learningRate: parseStringToNumber(e.target.value),
                },
              })
            )
          }
          valid={training.learningRate.valid}
          invalid={!training.learningRate.valid}
          feedbackValid=""
          feedbackInvalid={training.learningRate.error}
        />
      </ConfigurationCard>
      <ConfigurationCard
        explanation={batchSizesExplanation}
        documentationLink=""
        title="Batch size"
      >
        <CFormInput
          type="number"
          placeholder="auto"
          defaultValue={modelConfiguration.training.batchSize}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                training: {
                  batchSize: parseStringToNumber(e.target.value),
                },
              })
            )
          }
          valid={training.batchSize.valid}
          invalid={!training.batchSize.valid}
          feedbackValid=""
          feedbackInvalid={training.batchSize.error}
        />
      </ConfigurationCard>
    </div>
  );
}
