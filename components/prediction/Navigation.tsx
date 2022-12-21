import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { vars } from "../Navigation";

const displayMetrics = (metrics: any) =>
  Object.keys(metrics).map((key) => (
    <span key={key} className="mx-1">
      {key}: {metrics[key].toFixed(2)}
    </span>
  ));

const PredictioNavigation = ({ metrics }: any) => (
  <CHeader position="sticky" className="mb-4" style={vars}>
    <CContainer fluid>
      <CHeaderBrand className="mx-auto d-md-none">Header</CHeaderBrand>
      <CHeaderNav className="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink>Explore dataset</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>Adjust parameters</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>Change forecast horizon</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink>Metrics: {displayMetrics(metrics)}</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>History</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>Export</CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
  </CHeader>
);

export default PredictioNavigation;
