import { CButton, CCollapse, CContainer, CRow } from "@coreui/react";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectStatus, selectTargetColumn } from "../../src/store/selectors";
import { TestTrainSplitChart } from "./TestTrainSplitChart";
import PlotlyChart from "../Plotly";
import ResidualErrorChart from "./ResidualErrorChart";
import LoadingOverlay from "../prediction/LoadingOverlay";

export default function TestTrainSplitView() {
  const targetColumn = useAppSelector(selectTargetColumn);
  const validationResult = useAppSelector(
    (state) => state.datasets.validationResult
  );
  console.log(validationResult);
  const status = useAppSelector(selectStatus);

  const parameterPlot =
    validationResult && validationResult.status === "ok"
      ? structuredClone(validationResult.explainable.parameters)
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

  const [parametersVisible, setParametersVisible] = useState(false);
  const [residualVisible, setResidualVisible] = useState(false);

  return (
    <>
      {status === "loading" && <LoadingOverlay msg="Evaluating model..." />}
      {validationResult && validationResult.status === "ok" && (
        <>
          <CRow>
            <p>
              Current Holdout Percentage:{" "}
              {validationResult.validationConfiguration.split * 100} %
            </p>
          </CRow>
          <TestTrainSplitChart
            prediction={validationResult.prediction}
            holdoutFraction={validationResult.validationConfiguration.split}
            targetColumn={targetColumn}
            showUncertainty={true}
            showTrend={false}
            showEvents={false}
          />
          <CButton onClick={() => setResidualVisible(!residualVisible)}>
            {residualVisible ? "Hide residual error" : "Show residual error"}
          </CButton>
          <CButton onClick={() => setParametersVisible(!parametersVisible)}>
            {parametersVisible
              ? "Hide model parameters"
              : "Show model parameters"}
          </CButton>
          <CCollapse visible={residualVisible}>
            <ResidualErrorChart ds={ds!} y={y!} ypredicted={ypredicted!} />
          </CCollapse>
          <CCollapse visible={parametersVisible}>
            {parameterPlot && (
              <PlotlyChart
                data={parameterPlot.data}
                layout={parameterPlot.layout}
              />
            )}
          </CCollapse>
        </>
      )}
    </>
  );
}
