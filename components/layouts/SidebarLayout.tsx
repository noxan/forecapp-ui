import { ReactElement } from "react";
import Sidebar from "./Sidebar";
import { CButton } from "@coreui/react";
import { CNavItem } from "@coreui/react";
import { currentStep, enabledMenuItems } from "../../src/sidebar-types";

export default function SidebarLayout({
  currentStep,
  navItems,
  enabledMenuItems,
  children,
}: {
  currentStep: currentStep;
  navItems: ReactElement[];
  enabledMenuItems: enabledMenuItems;
  children: React.ReactNode;
}) {
  return (
    <div className="row align-items-start">
      <div className="col-2 sidebar--div">
        <Sidebar
          enabledMenuItems={enabledMenuItems}
          currentStep={currentStep}
          navItems={navItems}
        />
      </div>
      <div className="col-10">{children}</div>
    </div>
  );
}
