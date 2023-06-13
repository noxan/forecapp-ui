import { ReactElement } from "react";
import Sidebar from "./Sidebar";
import { CButton } from "@coreui/react";
import { CNavItem } from "@coreui/react";
import { currentStep } from "../../src/sidebar-types";

export default function SidebarLayout({
  currentStep,
  navItems,
  children,
}: {
  currentStep: currentStep;
  navItems: ReactElement[];
  children: React.ReactNode;
}) {
  return (
    <div className="row align-items-start">
      <div className="col-2 sidebar--div">
        <Sidebar currentStep={"Data Selector"} navItems={navItems} />
      </div>
      <div className="col-10">{children}</div>
    </div>
  );
}
