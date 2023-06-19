import { useState } from "react";
import ModelConfigurationSidepanel from "../components/ModelConfiguration/ModelConfigurationSidepanel";
import UnderlyingTrends from "../components/ModelConfiguration/underlying-trends";
import TrainingConfiguration from "../components/ModelConfiguration/training-configuration";
import DatasetInfo from "../components/ModelConfiguration/dataset-info";
import ModelingAssumptions from "../components/ModelConfiguration/modeling-assumptions";

type modelConfigurationMenu =
  | "Underlying Trends"
  | "Training Configuration"
  | "Dataset Info"
  | "Modeling Assumptions";

const renderSwitch = (selectedConfigMenu: string) => {
  switch (selectedConfigMenu) {
    case "Underlying Trends":
      return <UnderlyingTrends />;
    case "Training Configuration":
      return <TrainingConfiguration />;
    case "Dataset Info":
      return <DatasetInfo />;
    case "Modeling Assumptions":
      return <ModelingAssumptions />;
    default:
      return <h1>Nothing selected!</h1>;
  }
};

export default function ModelConfiguration(props: {
  selectedConfigMenu: string;
}) {
  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-9">{renderSwitch(props.selectedConfigMenu)}</div>
    </div>
  );
}
