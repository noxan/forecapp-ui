import {
  CAlert,
  CButton,
  CCol,
  CCollapse,
  CContainer,
  CHeader,
  CRow,
} from "@coreui/react";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectStatus, selectTargetColumn } from "../../src/store/selectors";
import { TestTrainSplitChart } from "./TestTrainSplitChart";
import PlotlyChart from "../Plotly";
import ResidualErrorChart from "./ResidualErrorChart";
import LoadingOverlay from "../prediction/LoadingOverlay";

export default function TestTrainSplitView(props: {
  staleEvaluation: boolean;
  validate: () => void;
}) {
  const targetColumn = useAppSelector(selectTargetColumn);
  const validationResult = useAppSelector(
    (state) => state.datasets.validationResult
  );
  const status = useAppSelector(selectStatus);
  const confidenceLevel = useAppSelector(
    (state) => state.models.validation.confidenceLevel
  );
  const holdoutFraction =
    useAppSelector((state) => state.models.validation.testSplit) / 100;

  const componentPlot =
    validationResult && validationResult.status === "ok"
      ? structuredClone(validationResult.explainable.components)
      : undefined;

  const y = useMemo(
    () =>
      validationResult
        ? Object.values(validationResult.prediction.y)
            .map((val) => Number(val))
            .filter((val) => !isNaN(val))
        : undefined,
    [validationResult]
  );
  const ds = useMemo(
    () =>
      validationResult
        ? Object.values(validationResult.prediction.ds)
        : undefined,
    [validationResult]
  );
  const ypredicted = useMemo(
    () =>
      validationResult
        ? Object.values(validationResult.prediction.yhat1)
            .map((val) => Number(val))
            .filter((val) => !isNaN(val))
        : undefined,
    [validationResult]
  );

  const [componentsVisible, setComponentsVisible] = useState<boolean>(false);

  return (
    <>
      <CCollapse visible={props.staleEvaluation}>
        <CAlert color="primary">
          <CRow>
            <CCol> The model configuration changed. Rerun evaluation?</CCol>
            <CCol>
              <CButton onClick={props.validate}>Confirm</CButton>
            </CCol>
          </CRow>
        </CAlert>
      </CCollapse>
      {status === "loading" && <LoadingOverlay msg="Evaluating model..." />}
      {validationResult && validationResult.status === "ok" && (
        <>
          <TestTrainSplitChart
            prediction={validationResult.prediction}
            holdoutFraction={
              validationResult.configuration.validation.testSplit / 100
            }
            targetColumn={targetColumn}
            showUncertainty={true}
            showTrend={false}
            showEvents={false}
            confidenceLevel={confidenceLevel}
          />
          <ResidualErrorChart
            ds={ds!}
            y={y!}
            ypredicted={ypredicted!}
            holdoutFraction={holdoutFraction}
          />
          <CButton onClick={() => setComponentsVisible(!componentsVisible)}>
            {componentsVisible
              ? "Hide model components"
              : "Show model components"}
          </CButton>
          <CCollapse visible={componentsVisible}>
            {componentPlot && (
              <PlotlyChart
                data={componentPlot.data}
                layout={componentPlot.layout}
              />
            )}
          </CCollapse>
        </>
      )}
    </>
  );
}
