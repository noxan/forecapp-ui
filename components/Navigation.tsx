import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import NavigationItem from "./NavigationItem";

export const vars: any = {
  "--cui-header-min-height": "3rem",
  "--cui-header-padding-y": "0.25rem",
};

export default function Navigation() {
  return (
    <CHeader position="sticky" className="mb-4" style={vars}>
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none">Header</CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <NavigationItem href="/" label="Home" />
          <NavigationItem href="/dataset" label="Dataset" />
          <NavigationItem href="/visualization" label="Visualization" />
          <NavigationItem href="/explore" label="Table" />
          <NavigationItem href="/model" label="Model" />
          <NavigationItem href="/prediction" label="Prediction" />
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="/debug">Debug</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">About</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">{/* <AppHeaderDropdown /> */}</CHeaderNav>
      </CContainer>
    </CHeader>
  );
}
