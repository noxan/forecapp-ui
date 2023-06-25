import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import {
  trainTestSplitExplanation,
  trainTestSplitDocumentationLink,
  quantilesExplanation,
  quantilesDocumentationLink,
} from "./ConfigExplanations";
import { useAppSelector, useAppDispatch } from "../../src/hooks";
import { selectModelConfiguration } from "../../src/store/selectors";
import { CFormInput, CFormRange } from "@coreui/react";
import { editModelConfig } from "../../src/store/models";

const parseStringToNumber = (value: string) =>
  value === "" ? null : Number(value);

export default function ValidationConfiguration() {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();
  return (
    <div data-section id="validation-configuration">
      <h2 className="mb-4">Validation Configuration</h2>
      <ConfigurationCard
        explanation={trainTestSplitExplanation}
        title="Train / Test Split"
        documentationLink={trainTestSplitDocumentationLink}
      >
        <CFormInput
          type="number"
          defaultValue={modelConfiguration.validation.testSplit}
          placeholder="Relative size of test set in %"
          onChange={(e) =>
            dispatch(
              editModelConfig({
                validation: { testSplit: parseStringToNumber(e.target.value) },
              })
            )
          }
        ></CFormInput>
      </ConfigurationCard>
      <ConfigurationCard
        explanation={quantilesExplanation}
        title="Quantiles"
        documentationLink={quantilesDocumentationLink}
      >
        <CFormRange
          min={68}
          max={99}
          step={1}
          label={`Confidence Interval (${modelConfiguration.validation.confidenceLevel}%)`}
          defaultValue={modelConfiguration.validation.confidenceLevel}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                validation: { confidenceLevel: Number(e.target.value) },
              })
            )
          }
        />
      </ConfigurationCard>
    </div>
  );
}
