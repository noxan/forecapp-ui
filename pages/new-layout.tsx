import AccordionSideBar, {
  AccordionSideBarGroupProps,
} from "../components/layouts/AccordionSidebar";
import { useMemo, useState } from "react";
import Validation, {
  ValidationViewMode,
} from "../components/validation/Validation";
import PredictionView from "../components/prediction/PredictionView";

type PageTypes =
  | "Data Selector"
  | "Model Configuration"
  | "Model Evaluation"
  | "Prediction";

function getPageComponent(pageInd: number, subPageInd: number) {
  const pageName = pages[pageInd].pageName;
  const subPageName =
    subPageInd >= 0 ? (pages[pageInd].subPages[subPageInd] as string) : "";
  switch (pageName) {
    case "Model Evaluation":
      return <Validation view={subPageName as ValidationViewMode} />;
    case "Prediction":
      return <PredictionView />;
    default:
      return <></>;
  }
}

const pages = [
  { pageName: "Data Selector", subPages: [] },
  {
    pageName: "Model Configuration",
    subPages: [
      "Underlying Trends",
      "Training Configuration",
      "Modeling Assumptions",
      "Dataset Info",
    ],
  },
  {
    pageName: "Model Evaluation",
    subPages: ["Test Train Split", "Previous Performance"],
  },
  { pageName: "Prediction", subPages: [] },
] as AccordionSideBarGroupProps[];

export default function Layout() {
  const [activePageInd, setActivePageInd] = useState(0);
  const [activeSubPageInd, setActiveSubPageInd] = useState(0);

  const pageComponent = useMemo(
    () => getPageComponent(activePageInd, activeSubPageInd),
    [activePageInd, activeSubPageInd]
  );
  return (
    <div className="row align-items-start">
      <div className="col-2 sidebar--div">
        <AccordionSideBar
          content={pages}
          activePageInd={activePageInd}
          activeSubPageInd={activeSubPageInd}
          onNavClick={(pageInd, subPageInd, event) => {
            setActivePageInd(pageInd);
            setActiveSubPageInd(subPageInd);
            event.preventDefault();
          }}
        />
      </div>
      <div className="col-10">{pageComponent}</div>
    </div>
  );
}
