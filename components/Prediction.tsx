import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useAppDispatch } from "../src/hooks";
import { neuralprophet } from "../src/store/datasets";

const Prediction = ({
  finalDataset,
  modelConfiguration,
  prediction,
}: {
  finalDataset: any[];
  modelConfiguration: any;
  prediction?: { forecast: any; metrics: any };
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
            onClick={() => {
              dispatch(
                neuralprophet({
                  dataset: finalDataset,
                  configuration: modelConfiguration,
                })
              );
            }}
          >
            Run prediction
          </CButton>
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
