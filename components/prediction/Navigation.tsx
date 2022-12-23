import {
  CButton,
  CContainer,
  CForm,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { vars } from "../Navigation";

type Metrics = {
  [key: string]: number;
};

const getLatestMetrics = (metrics: any) =>
  Object.keys(metrics).reduce((obj: Metrics, key: keyof Metrics) => {
    const metric = Object.values(metrics[key]);
    obj[key] = metric.slice(-1)[0] as number;
    return obj;
  }, {});

const displayMetrics = (metrics: any) => {
  const latestMetrics = getLatestMetrics(metrics);
  return Object.keys(latestMetrics)
    .filter((key) => key !== "epoch")
    .map((key) => (
      <span key={key} className="mx-1">
        {key}: {latestMetrics[key].toFixed(2)}
      </span>
    ));
};

const PredictioNavigation = ({ metrics, status, apiPredictionAction }: any) => (
  <CHeader position="sticky" className="mb-4" style={vars}>
    <CContainer fluid>
      <CHeaderBrand className="mx-auto d-md-none">Header</CHeaderBrand>
      <CHeaderNav className="d-none d-md-flex me-auto">
        {/* <CNavItem>
          <CNavLink>Explore dataset</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>Adjust parameters</CNavLink>
        </CNavItem> */}
      </CHeaderNav>
      <CHeaderNav>
        <CForm className="d-flex">
          <CButton variant="outline" onClick={apiPredictionAction}>
            Update forecast
          </CButton>
        </CForm>
        {metrics && (
          <CNavItem>
            <CNavLink>Metrics: {displayMetrics(metrics)}</CNavLink>
          </CNavItem>
        )}
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
