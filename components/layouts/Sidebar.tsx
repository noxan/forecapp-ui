import { ReactElement, useState } from "react";
import {
  CAccordion,
  CAccordionItem,
  CButton,
  CCollapse,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import HomeIcon from "@mui/icons-material/Home";
import { currentStep, disabledMenuItems } from "../../src/sidebar-types";

const vars = {
  "--cui-sidebar-padding-x": "0px",
  "--cui-sidebar-width": "100%",
};

export default function Sidebar({
  currentStep,
  navItems,
  disabledMenuItems,
}: {
  currentStep: currentStep;
  navItems: ReactElement[];
  disabledMenuItems: disabledMenuItems;
}) {
  const [comps, setComps] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <CSidebar style={vars} position="sticky">
      <CSidebarNav>
        <CButton onClick={() => setVisible(!visible)}>Test Button</CButton>
        <CCollapse visible={visible}>
          <CButton>Hello World!</CButton>
        </CCollapse>
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
        <CNavGroup visible={comps} toggler="Data Selector">
          <CNavItem disabled={disabledMenuItems["Data Selector"]} href="/">
            Data Selector
          </CNavItem>
          <CNavItem
            disabled={disabledMenuItems["Model Configuration"]}
            href="/"
          >
            Model Configuration
          </CNavItem>
          <CNavItem disabled={disabledMenuItems["Model Validation"]} href="/">
            Model Validation
          </CNavItem>
          <CNavItem disabled={disabledMenuItems["Prediction"]} href="/">
            Prediction
          </CNavItem>
        </CNavGroup>
        <CNavGroup toggler="Model Configuration"></CNavGroup>
        <CNavGroup toggler="Model Validation"></CNavGroup>
        <CNavGroup toggler="Prediction"></CNavGroup>
        {navItems}
      </CSidebarNav>
    </CSidebar>
  );
}
