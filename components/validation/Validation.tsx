import { useCallback, useEffect, useMemo, useState } from "react";
import TestTrainSplitView from "./TestTrainSplitView";
import CrossValidationView from "./CrossValidationView";
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
  const dispatch = useAppDispatch();
  const dataset = useAppSelector(selectDataset);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const columns = useAppSelector((state) => state.datasets.columns);

  const getTestTrainSplit = useCallback(
    async (split: number) => {
      try {
        await dispatch(
          validateModel({
            dataset: transformDataset(dataset, modelConfiguration, columns),
            validationConfig: {
              modelConfig: modelConfiguration,
              split: split,
            },
          })
        ).unwrap();
      } catch (error: any) {
        // TODO: Copy the error toast code over here, with some changes for validation
        console.log(error);
      }
    },
    [dataset, columns, modelConfiguration, dispatch]
  );

  useEffect(() => {
    console.log("Dispatched api call");
    getTestTrainSplit(0.2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewComponent = useMemo(() => viewRender(props.view), [props.view]);

  return viewComponent;
}
