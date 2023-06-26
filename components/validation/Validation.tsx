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

export type ValidationViewMode = "Test Train Split" | "Previous Performance";

function viewRender(view: ValidationViewMode) {
  switch (view) {
    case "Previous Performance":
      return <PreviousModelPerfView />;
    case "Test Train Split":
      return <TestTrainSplitView />;
  }
}

export default function Validation(props: { view: ValidationViewMode }) {
  const viewComponent = useMemo(() => viewRender(props.view), [props.view]);

  return viewComponent;
}
