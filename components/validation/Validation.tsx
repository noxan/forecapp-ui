import { useCallback, useEffect, useMemo, useState } from "react";
import TestTrainSplitView from "./TestTrainSplitView";
import PreviousModelPerfView from "./PreviousModelPerfView";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { validateModel } from "../../src/store/datasets";
import { transformDataset } from "../../src/helpers";
import {
  selectDataset,
  selectModelConfiguration,
  shouldEval,
} from "../../src/store/selectors";
import PlotlyChart from "../Plotly";

export type ValidationViewMode =
  | "Test Train Split"
  | "Previous Performance"
  | "Model Parameters";

export default function Validation(props: {
  view: ValidationViewMode;
  validate: () => void;
}) {
  const validationResult = useAppSelector(
    (state) => state.datasets.validationResult
  );
  const staleEvaluation = useAppSelector(shouldEval);
  const parameterPlot =
    validationResult && validationResult.status === "ok"
      ? structuredClone(validationResult.explainable.parameters)
      : undefined;

  const viewComponent = useMemo(() => {
    switch (props.view) {
      case "Previous Performance":
        return <PreviousModelPerfView />;
      case "Test Train Split":
        return (
          <TestTrainSplitView
            staleEvaluation={staleEvaluation}
            validate={props.validate}
          />
        );
      case "Model Parameters":
        return (
          parameterPlot && (
            <PlotlyChart
              data={parameterPlot.data}
              layout={parameterPlot.layout}
            />
          )
        );
    }
  }, [props, parameterPlot]);

  return viewComponent;
}
