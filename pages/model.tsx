import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { editModelConfig } from "../src/store/models";
import { modelConfigSchema } from "../src/forms";

const ReactJson = dynamic(() => import("@microlink/react-json-view"), {
  ssr: false,
});

export default function Debug() {
  const modelConfig = useAppSelector((state) => state.models);
  const dispatch = useAppDispatch();

  const log = (type: any) => console.log.bind(console, type);

  return (
    <Layout>
      <CContainer>
        <CRow className="my-2">
          <CCol>
            <h1>Model</h1>
          </CCol>
        </CRow>

        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Trend</CCardTitle>
                <CCardText>
                  <Form
                    schema={modelConfigSchema}
                    validator={validator}
                    onChange={log("changed")}
                    onSubmit={log("submitted")}
                    onError={log("errors")}
                  />
                  T(t) = Trend at time t
                  <ul>
                    <li> growth = off | linear</li>
                    <li>changepoints = [datetimes]</li>
                    <li>n_changepoints = int</li>
                    <li>changepoints_range = float</li>
                    <li>trend_reg = float</li>
                    <li>trend_reg_threshold = bool</li>
                    <li>trend_global_local = global | local</li>
                  </ul>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Seasonality</CCardTitle>
                <CCardText>
                  S(t) = Seasonal effects at time t
                  <ul>
                    <li>yearly_seasonality = bool | auto | int</li>
                    <li>weekly_seasonality = bool | auto | int</li>
                    <li>daily_seasonality = bool | auto | int</li>
                    <li>seasonality_mode = additive | multiplicative</li>
                    <li>seasonality_reg = float</li>
                    <li>season_global_local = global | local</li>
                  </ul>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Auto regression</CCardTitle>
                <CCardText>
                  A(t) = Auto-regression effects at time t based on past
                  observations
                  <ul>
                    <li>n_lags = int</li>
                    <li>ar_reg = float</li>
                    <li>n_forecasts = int</li>
                    <li>num_hidden_layers = int (default = 0)</li>
                    <li>d_hidden = int</li>
                  </ul>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Events and holidays</CCardTitle>
                <CCardText>
                  E(t) = Event and holiday effects at time t
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Future and lagged regressors</CCardTitle>
                <CCardText>
                  <ul>
                    <li>
                      F(t) = Regression effects at time t for future-known
                      exogenous variables
                    </li>
                    <li>
                      L(t) = Regression effects at time t for lagged
                      observations of exogenous variables
                    </li>
                  </ul>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Training</CCardTitle>
                <CCardText>
                  <ul>
                    <li> learning_rate = float</li>
                    <li>epochs = int</li>
                    <li>batch_size = int</li>
                    <li>newer_samples_weight = float</li>
                    <li>newer_samples_start = float</li>
                    <li>loss_func = str | torch.nn.functional.loss</li>
                    <li>collect_metrics = bool | [str]</li>
                    <li>quantiles = [float]</li>
                  </ul>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Validation</CCardTitle>
                <CCardText>
                  <ul>
                    <li>???</li>
                  </ul>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard className="mb-3">
              <CCardBody>
                <CCardTitle>Data preparation</CCardTitle>
                <CCardText>
                  <ul>
                    <li>impute_missing = bool</li>
                    <li>impute_linear = int</li>
                    <li>impute_rolling = int</li>
                    <li>drop_missing = bool</li>
                    <li>normalize = str</li>
                    <li>global_normalization = bool</li>
                    <li>global_time_normalization = bool</li>
                    <li>unknown_data_normalization = bool</li>
                  </ul>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow className="my-2">
          <CCol>
            <Suspense fallback={`Loading...`}>
              <ReactJson
                src={modelConfig}
                sortKeys
                collapsed={1}
                onEdit={(evt) => dispatch(editModelConfig(evt))}
              />
            </Suspense>
          </CCol>
        </CRow>
      </CContainer>
    </Layout>
  );
}
