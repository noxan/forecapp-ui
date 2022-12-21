import {
  CBadge,
  CButton,
  CCol,
  CCollapse,
  CContainer,
  CRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { useState } from "react";
import { transformDatasetForChart } from "../src/helpers";
import { useAppDispatch } from "../src/hooks";
import { apiPrediction } from "../src/store/datasets";

const Prediction = ({
  finalDataset,
  modelConfiguration,
  prediction,
  status,
}: {
  finalDataset: any[];
  modelConfiguration: any;
  prediction?: { forecast: any; metrics: any };
  status: string;
}) => {
  const dispatch = useAppDispatch();
  const [showDebug, setShowDebug] = useState(false);

  const chartData = prediction
    ? transformDatasetForChart(prediction.forecast)
    : undefined;

  return (
    <>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Prediction</h1>
          </CCol>
          <CCol>
            <CButton onClick={() => setShowDebug(!showDebug)} color="link">
              Toggle debug info
            </CButton>
          </CCol>
        </CRow>
        <CCollapse visible={showDebug}>
          <CRow md={{ cols: 2 }}>
            <CCol>
              <h3>Dataset</h3>
              <pre style={{ maxHeight: "20rem" }}>
                {JSON.stringify(finalDataset, null, 2)}
              </pre>
            </CCol>
            <CCol>
              <h3>Parameters</h3>
              <pre style={{ maxHeight: "20rem" }}>
                {JSON.stringify(modelConfiguration, null, 2)}
              </pre>
            </CCol>
          </CRow>
        </CCollapse>
        <CRow className="my-2">
          <CCol>
            <CButton
              disabled={status === "loading"}
              className={`btn-loading${
                status === "loading" ? " is-loading" : ""
              }`}
              onClick={() => {
                dispatch(
                  apiPrediction({
                    dataset: finalDataset,
                    configuration: modelConfiguration,
                  })
                );
              }}
            >
              {status === "loading" ? (
                <>
                  <span
                    className="btn-loading-spinner spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                </>
              ) : (
                ""
              )}
              Run prediction
            </CButton>
          </CCol>
          <CCol>
            <CBadge color="dark">{process.env.NEXT_PUBLIC_API_URL}</CBadge>
          </CCol>
        </CRow>
      </CContainer>
      {prediction && chartData && (
        <>
          <CChartLine data={chartData} />
          <CCollapse visible={showDebug}>
            <CContainer>
              <CRow md={{ cols: 2 }}>
                <CCol>
                  <h3>Forecast</h3>
                  <pre style={{ maxHeight: "20rem" }}>
                    {JSON.stringify(prediction.forecast, null, 2)}
                  </pre>
                </CCol>
                <CCol>
                  <h3>Metrics</h3>
                  <pre style={{ maxHeight: "20rem" }}>
                    {JSON.stringify(prediction.metrics, null, 2)}
                  </pre>
                </CCol>
              </CRow>
            </CContainer>
          </CCollapse>
        </>
      )}
    </>
  );
};

export default Prediction;
