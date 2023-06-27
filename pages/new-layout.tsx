import { CButton } from "@coreui/react";
import { CNavItem } from "@coreui/react";
import AccordionSideBar, {
  AccordionSideBarGroupProps,
} from "../components/layouts/AccordionSidebar";
import { useState } from "react";

const disabledMenuItems = {
  ["Data Selector"]: true,
  ["Model Configuration"]: false,
  ["Model Validation"]: false,
  ["Prediction"]: false,
};

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
  const [activePage, setActivePage] = useState(0);
  const [activeSubPage, setActiveSubPage] = useState(0);
  return (
    <div className="row align-items-start">
      <div className="col-2 sidebar--div">
        <AccordionSideBar
          content={pages}
          activePageInd={activePage}
          activeSubPageInd={activeSubPage}
          onNavClick={(pageInd, subPageInd, event) => {
            setActivePage(pageInd);
            setActiveSubPage(subPageInd);
            event.preventDefault();
          }}
        />
      </div>
      <div className="col-10"></div>
    </div>
  );
}
