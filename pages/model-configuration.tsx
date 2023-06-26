import { useEffect, useRef, useState } from "react";
import ModelConfigurationSidepanel from "../components/ModelConfiguration/ModelConfigurationSidepanel";
import UnderlyingTrends from "../components/ModelConfiguration/underlying-trends";
import TrainingConfiguration from "../components/ModelConfiguration/training-configuration";
import DatasetInfo from "../components/ModelConfiguration/dataset-info";
import ModelingAssumptions from "../components/ModelConfiguration/modeling-assumptions";
import ValidationConfiguration from "../components/ModelConfiguration/validation-configuration";
import PredictionConfiguration from "../components/ModelConfiguration/prediction-configuration";
import { validateModelParameters } from "../src/schemas/modelParameters";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { selectModelConfiguration } from "../src/store/selectors";

export type modelConfigurationMenu =
  | "underlying-trends"
  | "training-configuration"
  | "dataset-info"
  | "modeling-assumptions"
  | "validation-configuration"
  | "prediction-configuration";

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
    case "validation-configuration":
      return <ValidationConfiguration />;
    case "prediction-configuration":
      return <PredictionConfiguration />;
    default:
      return <h1>Nothing selected!</h1>;
  }
};

export default function ModelConfiguration() {
  const [selectedConfigMenu, setSelectedConfigMenu] =
    useState("underlying-trends");
  const sections = useRef([]);
  const handleScroll = () => {
    const pageYOffset = window.scrollY;
    let newSelectedConfigMenu = null;
    sections.current.forEach((section) => {
      const sectionOffsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        pageYOffset + 20 >= sectionOffsetTop &&
        pageYOffset < sectionOffsetTop + sectionHeight
      ) {
        newSelectedConfigMenu = section.id;
        console.log(newSelectedConfigMenu);
      }
    });
    setSelectedConfigMenu(newSelectedConfigMenu);
  };
  useEffect(() => {
    sections.current = document.querySelectorAll("[data-section");
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="row">
      <div className="col-3">
        <ModelConfigurationSidepanel
          selectedMenuOption={selectedConfigMenu}
        ></ModelConfigurationSidepanel>
      </div>
      <div className="col-9">
        <div className="overflow-scroll">
          {[
            renderSwitch("prediction-configuration"),
            <hr
              key="line_1"
              style={{
                background: "black",
                color: "black",
                height: "3px",
                borderColor: "black",
              }}
            />,
            renderSwitch("dataset-info"),
            <hr
              key="line_5"
              style={{
                background: "black",
                color: "black",
                height: "3px",
                borderColor: "black",
              }}
            />,
            renderSwitch("underlying-trends"),
            <hr
              key="line_2"
              style={{
                background: "black",
                color: "black",
                height: "3px",
                borderColor: "black",
              }}
            />,
            renderSwitch("modeling-assumptions"),
            <hr
              key="line_3"
              style={{
                background: "black",
                color: "black",
                height: "3px",
                borderColor: "black",
              }}
            />,
            renderSwitch("training-configuration"),
            <hr
              key="line_4"
              style={{
                background: "black",
                color: "black",
                height: "3px",
                borderColor: "black",
              }}
            />,
            renderSwitch("validation-configuration"),
          ]}
        </div>
      </div>
    </div>
  );
}
