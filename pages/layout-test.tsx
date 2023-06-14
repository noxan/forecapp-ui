import { CButton } from "@coreui/react";
import { CNavItem } from "@coreui/react";
import SidebarLayout from "../components/layouts/SidebarLayout";

const navItems = [
  <CNavItem key={1} href="/">
    Data Selector
  </CNavItem>,
  <CNavItem key={2} href="/">
    Data Selector
  </CNavItem>,
  <CNavItem key={3} href="/">
    Data Selector
  </CNavItem>,
];

const enabledMenuItems = {
  ["Data Selector"]: true,
  ["Model Configuration"]: false,
  ["Model Validation"]: false,
  ["Prediction"]: false,
};

export default function Layout() {
  return (
    <SidebarLayout
      enabledMenuItems={enabledMenuItems}
      currentStep="Data Selector"
      navItems={navItems}
    >
      <p>Test</p>
    </SidebarLayout>
  );
}
