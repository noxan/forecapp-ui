import { ReactElement } from "react";
import {
  CButton,
  CNavGroup,
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from "@coreui/react";
import HomeIcon from "@mui/icons-material/Home";
import { navItem, currentStep } from "../../src/sidebar-types";

const vars = {
  "--cui-sidebar-padding-x": "0px",
  "--cui-sidebar-width": "100%",
};

export default function Sidebar({
  currentStep,
  navItems,
}: {
  currentStep: currentStep;
  navItems: ReactElement[];
}) {
  return (
    <CSidebar style={vars} position="sticky">
      <CSidebarBrand>{currentStep}</CSidebarBrand>
      <CSidebarNav>
        <CNavItem href="/">
          <HomeIcon
            sx={{
              width: "2em",
              alignContent: "center",
              justifyContent: "flex-start",
              display: "flex",
            }}
          />
          Home
        </CNavItem>
        <CNavGroup toggler="Model Builder Steps">
          <CNavItem href="/">Data Selector</CNavItem>
          <CNavItem href="/">Model Configuration</CNavItem>
          <CNavItem href="/">Model Validation</CNavItem>
          <CNavItem href="/">Prediction</CNavItem>
        </CNavGroup>
        {navItems}
      </CSidebarNav>
    </CSidebar>
  );
}
