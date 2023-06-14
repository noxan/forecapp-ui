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
import { currentStep, enabledMenuItems } from "../../src/sidebar-types";

const vars = {
  "--cui-sidebar-padding-x": "0px",
  "--cui-sidebar-width": "100%",
};

export default function Sidebar({
  currentStep,
  navItems,
  enabledMenuItems,
}: {
  currentStep: currentStep;
  navItems: ReactElement[];
  enabledMenuItems: enabledMenuItems;
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
          <CNavItem disabled={enabledMenuItems["Data Selector"]} href="/">
            Data Selector
          </CNavItem>
          <CNavItem disabled={enabledMenuItems["Model Configuration"]} href="/">
            Model Configuration
          </CNavItem>
          <CNavItem disabled={enabledMenuItems["Model Validation"]} href="/">
            Model Validation
          </CNavItem>
          <CNavItem disabled={enabledMenuItems["Prediction"]} href="/">
            Prediction
          </CNavItem>
        </CNavGroup>
        {navItems}
      </CSidebarNav>
    </CSidebar>
  );
}
