import { useCallback, useEffect, useMemo, useState } from "react";
import TestTrainSplitView from "./TestTrainSplitView";
import PreviousModelPerfView from "./PreviousModelPerfView";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { validateModel } from "../../src/store/datasets";
import { transformDataset } from "../../src/helpers";
import {
  selectDataset,
  selectModelConfiguration,
} from "../../src/store/selectors";

export type ValidationViewMode =
  | "Test Train Split"
  | "Previous Performance"
  | "Start";

export default function Validation(props: {
  view: ValidationViewMode;
  staleEvaluation: boolean;
  validate: () => void;
}) {
  const viewComponent = useMemo(() => {
    switch (props.view) {
      case "Previous Performance":
        return <PreviousModelPerfView />;
      case "Test Train Split":
        return (
          <TestTrainSplitView
            staleEvaluation={props.staleEvaluation}
            validate={props.validate}
          />
        );
      case "Start":
        return <>Start</>;
    }
  }, [props]);

  return viewComponent;
}
