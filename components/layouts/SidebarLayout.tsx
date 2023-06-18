import { ReactElement } from "react";
import Sidebar from "./Sidebar";
import { CButton } from "@coreui/react";
import { CNavItem } from "@coreui/react";
import { currentStep, disabledMenuItems } from "../../src/sidebar-types";
import AccordionSidebar from "./AccordionSidebar";
import ContentSidebar from "./ContentSidebar";

export default function SidebarLayout({
  currentStep,
  navItems,
  disabledMenuItems,
  children,
}: {
  currentStep: currentStep;
  navItems: any;
  disabledMenuItems: disabledMenuItems;
  children: React.ReactNode;
}) {
  return (
    <div className="row align-items-start">
      <div className="col-2 sidebar--div">
        {/* <Sidebar
          disabledMenuItems={disabledMenuItems}
          currentStep={currentStep}
          navItems={navItems}
        /> */}
        <ContentSidebar navItems={navItems} />
      </div>
      <div className="col-10">{children}</div>
    </div>
  );
}
