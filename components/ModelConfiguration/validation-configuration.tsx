import { selectModelConfiguration } from "../../src/store/selectors";
import { useAppSelector, useAppDispatch } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import {
  trainTestSplitExplanation,
  trainTestSplitDocumentationLink,
  quantilesExplanation,
  quantilesDocumentationLink,
} from "./ConfigExplanations";

export default function ValidationConfiguration() {
  return (
    <div data-section id="validation-configuration">
      <h2 className="mb-4">Validation Configuration</h2>
      <ConfigurationCard
        explanation={trainTestSplitExplanation}
        title="Train / Test Split"
        documentationLink={trainTestSplitDocumentationLink}
      >
        <h2>Test</h2>
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
