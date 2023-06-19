import { CButton, CCollapse, CContainer, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectTargetColumn } from "../../src/store/selectors";
import { TestTrainSplitChart } from "./TestTrainSplitChart";
import PlotlyChart from "../Plotly";
import ResidualErrorChart from "./ResidualErrorChart";

export default function TestTrainSplitView() {
  const targetColumn = useAppSelector(selectTargetColumn);
  const validationResult = useAppSelector(
    (state) => state.datasets.validationResult
  );

  const parameterPlot = structuredClone(
    validationResult.explainable.parameters
  );

  const ds = Object.values(validationResult.prediction.ds);
  const y = Object.values(validationResult.prediction.y).map((val) =>
    Number(val)
  );
  const predicted = Object.values(validationResult.prediction.yhat1).map(
    (val) => Number(val)
  );

  /*
  const [priorHoldoutPercent, setPriorHoldout] = useState(20);
  const [currHoldoutPercent, setCurrHoldout] = useState(20);
  */
  const [parametersVisible, setParametersVisible] = useState(false);

  /*
  <CFormRange
        min={0}
        max={100}
        value={currHoldoutPercent}
        onChange={(event) => setCurrHoldout(Number(event.target.value))}
        step={1}
        label={`Holdout Percentage: ${currHoldoutPercent}%`}
      ></CFormRange>
      <CButton
        disabled={priorHoldoutPercent === currHoldoutPercent}
      >
        Re-evaluate Model
      </CButton>
  */

  return (
    <CContainer fluid>
      <CRow>
        <p>
          Current Holdout Percentage:{" "}
          {validationResult.validationConfiguration.split * 100} %
        </p>
      </CRow>
      {validationResult && (
        <>
          <TestTrainSplitChart
            prediction={validationResult.prediction}
            holdoutFraction={validationResult.validationConfiguration.split}
            targetColumn={targetColumn}
            showUncertainty={true}
            showTrend={false}
            showEvents={false}
          />
          <ResidualErrorChart ds={ds} y={y} ypredicted={predicted} />
          <CButton onClick={() => setParametersVisible(!parametersVisible)}>
            {parametersVisible
              ? "Hide model parameters"
              : "Show model parameters"}
          </CButton>
          <CCollapse visible={parametersVisible}>
            <PlotlyChart
              data={parameterPlot.data}
              layout={parameterPlot.layout}
            />
          </CCollapse>
        </>
      )}
    </CContainer>
  );
}
