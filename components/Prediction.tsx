import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useAppDispatch } from "../src/hooks";
import { ColumnConfigurations, neuralprophet } from "../src/store/datasets";

const Prediction = ({
  finalDataset,
  columns,
  modelConfiguration,
  prediction,
  status,
}: {
  finalDataset: any[];
  columns: ColumnConfigurations;
  modelConfiguration: any;
  prediction?: { forecast: any; metrics: any };
  status: string;
}) => {
  const dispatch = useAppDispatch();
  return (
    <CContainer>
      <CRow className="my-2">
        <CCol>
          <h1>Model input</h1>
        </CCol>
      </CRow>
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
      <CRow className="my-2">
        <CCol>
          <CButton
            disabled={status === "loading"}
            className={`btn-loading${
              status === "loading" ? " is-loading" : ""
            }`}
            onClick={() => {
              dispatch(
                neuralprophet({
                  dataset: finalDataset,
                  columns,
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
          {process.env.NEXT_PUBLIC_API_URL}
        </CCol>
      </CRow>
      {prediction && (
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
      )}
    </CContainer>
  );
};

export default Prediction;
