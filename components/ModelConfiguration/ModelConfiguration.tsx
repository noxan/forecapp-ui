import { useEffect, useRef, useState } from "react";
import ModelConfigurationSidepanel from "./ModelConfigurationSidepanel";
import UnderlyingTrends from "./underlying-trends";
import TrainingConfiguration from "./training-configuration";
import DatasetInfo from "./dataset-info";
import ModelingAssumptions from "./modeling-assumptions";
import ValidationConfiguration from "./validation-configuration";
import PredictionConfiguration from "./prediction-configuration";
import { validateModelParameters } from "../../src/schemas/modelParameters";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { selectModelConfiguration } from "../../src/store/selectors";

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

export default function ModelConfiguration(props: {
  onSelectionChange: (newSelection: modelConfigurationMenu) => void;
}) {
  const sections = useRef<HTMLElement[]>([]);
  const handleScroll = () => {
    const pageYOffset = window.scrollY;
    let newSelectedConfigMenu: modelConfigurationMenu = "underlying-trends";
    sections.current.forEach((section) => {
      const sectionOffsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        pageYOffset + 20 >= sectionOffsetTop &&
        pageYOffset < sectionOffsetTop + sectionHeight
      ) {
        newSelectedConfigMenu = section.id as modelConfigurationMenu;
      }
    });
    props.onSelectionChange(newSelectedConfigMenu!);
  };
  useEffect(() => {
    sections.current = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section").values()
    );
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="overflow-scroll">
      {[
        renderSwitch("dataset-info"),
        <hr
          key="line_1"
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
        <hr
          key="line_5"
          style={{
            background: "black",
            color: "black",
            height: "3px",
            borderColor: "black",
          }}
        />,
        renderSwitch("prediction-configuration"),
      ]}
    </div>
  );
}
