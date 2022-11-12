import Link from "next/link";
import { useRouter } from "next/router";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";

const vars: any = {
  "--cui-header-min-height": "3rem",
  "--cui-header-padding-y": "0.25rem",
};

const NavigationItem = ({ href, label }: { href: string; label: string }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const active = currentRoute === href;
  return (
    <CNavItem>
      <CNavLink component={Link} href={href} active={active}>
        {label}
      </CNavLink>
    </CNavItem>
  );
};

export default function Navigation() {
  return (
    <CHeader position="sticky" className="mb-4" style={vars}>
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none">Header</CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <NavigationItem href="/" label="Home" />
          <NavigationItem href="/dataset" label="Dataset" />
          <NavigationItem href="/model" label="Model" />
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
