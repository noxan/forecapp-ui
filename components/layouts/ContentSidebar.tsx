import React, { ReactElement, useState } from "react";
import {
  CCollapse,
  CButton,
  CSidebar,
  CSidebarNav,
  CNavItem,
} from "@coreui/react";
import HomeIcon from "@mui/icons-material/Home";

const vars = {
  "--cui-sidebar-padding-x": "0px",
  "--cui-sidebar-width": "100%",
};

const getUnfoldedOptionFromURL = () => {
  if (window.location.pathname.startsWith("/data-selector")) {
    return "Data Selector";
  } else if (window.location.pathname.startsWith("/model-configuration")) {
    return "Model Configuration";
  } else if (window.location.pathname.startsWith("/model-validation")) {
    return "Model Validation";
  } else if (window.location.pathname.startsWith("/prediction")) {
    return "Prediction";
  } else {
    return "Data Selector";
  }
};

export default function ContentSidebar({ navItems }: { navItems: any }) {
  const [unfoldedOption, setUnfoldedOption] = useState(
    getUnfoldedOptionFromURL()
  );
  return (
    <CSidebar style={vars} position="sticky">
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
        <CButton
          shape="rounded-0"
          color="dark"
          onClick={() => {
            setUnfoldedOption("Data Selector");
            window.location.pathname.startsWith("/data-selector")
              ? null
              : window.location.replace("/data-selector");
          }}
        >
          Data Selector
        </CButton>
        <CCollapse visible={getUnfoldedOptionFromURL() === "Data Selector"}>
          {navItems["Data Selector"]}
        </CCollapse>
        <CButton
          shape="rounded-0"
          color="dark"
          onClick={() => {
            setUnfoldedOption("Model Configuration");
            window.location.pathname.startsWith("/model-configuration")
              ? null
              : window.location.replace("/model-configuration");
          }}
        >
          Model Configuration
        </CButton>
        <CCollapse
          visible={getUnfoldedOptionFromURL() === "Model Configuration"}
        >
          {navItems["Model Configuration"]}
        </CCollapse>
        <CButton
          shape="rounded-0"
          color="dark"
          onClick={() => {
            setUnfoldedOption("Model Validation");
            window.location.pathname.startsWith("/model-validation")
              ? null
              : window.location.replace("/model-validation");
          }}
        >
          Model Validation
        </CButton>
        <CCollapse visible={getUnfoldedOptionFromURL() === "Model Validation"}>
          {navItems["Model Validation"]}
        </CCollapse>
        <CButton
          shape="rounded-0"
          color="dark"
          onClick={() => {
            setUnfoldedOption("Prediction");
            window.location.pathname.startsWith("/prediction")
              ? null
              : window.location.replace("/prediction");
          }}
        >
          Prediction
        </CButton>
        <CCollapse visible={getUnfoldedOptionFromURL() === "Prediction"}>
          {navItems["Prediction"]}
        </CCollapse>
      </CSidebarNav>
    </CSidebar>
  );
}
