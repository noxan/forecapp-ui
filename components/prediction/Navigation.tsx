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
import { useState } from "react";
import { unparse as papaUnparse } from "papaparse";
import DatasetExplorer from "../DatasetExplorer";
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

const exportCSV = (data: any) => {
  // Transform data into CSV format
  const keys = Object.keys(data);
  const tmp = Object.values(data[keys[0]]).map((_, index) => {
    const obj: any = {};
    keys.forEach((key: any) => {
      obj[key] = data[key][index];
    });
    return obj;
  });
  const csv = papaUnparse(tmp);
  // Download CSV
  const blob = new Blob([csv]);
  const href = URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.href = href;
  tempLink.setAttribute("download", "forecapp-export.csv");
  tempLink.click();
};

const PredictioNavigation = ({
  metrics,
  status,
  forecastData,
  apiPredictionAction,
}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CHeader position="sticky" className="mb-4" style={vars}>
      <CContainer fluid>
        <DatasetExplorer
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <CHeaderBrand className="mx-auto d-md-none">Header</CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink onClick={() => setModalVisible(true)}>
              Explore dataset
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
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
          <CForm className="d-flex">
            <CButton
              variant="outline"
              color="secondary"
              onClick={() => exportCSV(forecastData)}
            >
              Export CSV
            </CButton>
          </CForm>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default PredictioNavigation;
