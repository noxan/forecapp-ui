import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import { selectModelConfiguration } from "../../src/store/selectors";
import { CFormInput, CFormCheck } from "@coreui/react";

const parseStringToNumber = (value: string) =>
  value === "" ? null : Number(value);

export default function TrainingConfiguration() {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();
  return (
    <div>
      <ConfigurationCard explanation="Test123" title="Epochs">
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
      <ConfigurationCard explanation="Test123" title="Learning rate">
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
        />
      </ConfigurationCard>
      <ConfigurationCard explanation="Test123" title="Batch size">
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
        />
      </ConfigurationCard>
    </div>
  );
}
