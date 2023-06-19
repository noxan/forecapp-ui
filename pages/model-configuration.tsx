import { useState } from "react";
import ModelConfigurationSidepanel from "../components/ModelConfiguration/ModelConfigurationSidepanel";
import UnderlyingTrends from "../components/ModelConfiguration/underlying-trends";
import TrainingConfiguration from "../components/ModelConfiguration/training-configuration";
import DatasetInfo from "../components/ModelConfiguration/dataset-info";
import ModelingAssumptions from "../components/ModelConfiguration/modeling-assumptions";

type modelConfigurationMenu =
  | "underlying-trends"
  | "training-configuration"
  | "dataset-info"
  | "modeling-assumptions";

const renderSwitch = (selectedConfigMenu: string) => {
  switch (selectedConfigMenu) {
    case "underlying-trends":
      return <UnderlyingTrends />;
    case "training-configuration":
      return <TrainingConfiguration />;
    case "dataset-info":
      return <DatasetInfo />;
    case "modeling-assumptions":
      return <ModelingAssumptions />;
    default:
      return <h1>Nothing selected!</h1>;
  }
};

export default function ModelConfiguration() {
  const [selectedConfigMenu, setSelectedConfigMenu] =
    useState("underlying-trends");
  return (
    <div className="row">
      <div className="col-3">
        <ModelConfigurationSidepanel
          selectedMenuOption={selectedConfigMenu}
          setSelectedMenuOption={setSelectedConfigMenu}
        ></ModelConfigurationSidepanel>
      </div>
      <div className="col-9">{renderSwitch(selectedConfigMenu)}</div>
    </div>
  );
}
