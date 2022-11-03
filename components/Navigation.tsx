import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";

export default function Navigation() {
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none">Header</CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink href="#">1. Upload</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">2. Fit</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">3. Analyze</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">Test</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Base</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">What</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">{/* <AppHeaderDropdown /> */}</CHeaderNav>
      </CContainer>
    </CHeader>
  );
}
