import { CButton } from "@coreui/react";
import { CNavItem } from "@coreui/react";
import SidebarLayout from "../components/layouts/SidebarLayout";

const navItems = {
  ["Data Selector"]: (
    <CNavItem key={1} href="/">
      Data Selector
    </CNavItem>
  ),
  ["Model Configuration"]: (
    <CNavItem key={2} href="/">
      Data Selector
    </CNavItem>
  ),
  ["Model Validation"]: (
    <CNavItem key={3} href="/">
      Data Selector
    </CNavItem>
  ),
  ["Prediction"]: (
    <>
      <CNavItem key={3} href="/">
        Data Selector
      </CNavItem>
      <CNavItem key={4} href="/">
        Data Selector
      </CNavItem>
    </>
  ),
};

const disabledMenuItems = {
  ["Data Selector"]: true,
  ["Model Configuration"]: false,
  ["Model Validation"]: false,
  ["Prediction"]: false,
};

export default function Layout() {
  return (
    <SidebarLayout
      disabledMenuItems={disabledMenuItems}
      currentStep="Data Selector"
      navItems={navItems}
    >
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
    </SidebarLayout>
  );
}
