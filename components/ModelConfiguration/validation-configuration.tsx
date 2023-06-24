import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import {
  trainTestSplitExplanation,
  trainTestSplitDocumentationLink,
  quantilesExplanation,
  quantilesDocumentationLink,
} from "./ConfigExplanations";
import { useAppSelector, useAppDispatch } from "../../src/hooks";
import { selectModelConfiguration } from "../../src/store/selectors";
import { CFormInput } from "@coreui/react";
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
        <h2>Test</h2>
      </ConfigurationCard>
    </div>
  );
}
