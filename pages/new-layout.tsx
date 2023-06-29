import AccordionSideBar, {
  AccordionSideBarGroupProps,
} from "../components/layouts/AccordionSidebar";
import { ReactElement, useMemo, useState } from "react";
import Validation, {
  ValidationViewMode,
} from "../components/validation/Validation";
import PredictionView from "../components/prediction/PredictionView";
import { CToaster } from "@coreui/react";
import { apiPrediction, validateModel } from "../src/store/datasets";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import {
  selectDataset,
  selectModelConfiguration,
  shouldEval,
  shouldPredict,
} from "../src/store/selectors";
import { transformDataset } from "../src/helpers";
import { ModelParameters } from "../src/schemas/modelParameters";
import { ZodError } from "zod";
import { HTTPError, NeuralProphetError, ValidationError } from "../src/error";
import { errorToastWithMessage } from "../components/ErrorToast";
import ModelConfiguration, {
  modelConfigurationMenu,
} from "../components/ModelConfiguration/ModelConfiguration";
import DataSelectorPage, {
  DataSelectorPages,
} from "../components/DataSelectorPage";
import PredictionConfigCard, {
  PredictionConfig,
} from "../components/prediction/PredictionConfigCard";
import SideBar from "../components/layouts/Sidebar";

const modelConfigSubPage: modelConfigurationMenu[] = [
  "prediction-configuration",
  "dataset-info",
  "underlying-trends",
  "modeling-assumptions",
  "training-configuration",
  "validation-configuration",
];

const dataSelectorSubPage: DataSelectorPages[] = [
  "data-selector",
  "data-viewer",
  "data-visualize",
  "data-table",
];

const modelEvaluationSubPage: ValidationViewMode[] = [
  "Test Train Split",
  "Previous Performance",
];

enum Pages {
  DataSelector = 0,
  ModelConfiguration = 1,
  ModelEvaluation = 2,
  Prediction = 3,
}

const pages = [
  {
    pageName: "Data Selector",
    subPages: ["Data Selector", "View Data", "Visualize Data", "Data Table"],
  },
  {
    pageName: "Model Configuration",
    subPages: [
      "Prediction Configuration",
      "Dataset Info",
      "Underlying Trends",
      "Modeling Assumptions",
      "Training Configuration",
      "Validation Configuration",
    ],
  },
  {
    pageName: "Model Evaluation",
    subPages: ["Test Train Split", "Previous Performance"],
  },
  {
    pageName: "Prediction",
    subPages: [
      <PredictionConfigCard
        key="prediction-card"
        config={{
          showUncertainty: true,
          showTrend: false,
          showEvents: false,
          showHistory: false,
        }}
        updateConfig={(_) => _}
      />,
    ],
  },
] as AccordionSideBarGroupProps[];

export default function Layout() {
  const dispatch = useAppDispatch();
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dataset = useAppSelector(selectDataset);
  const columns = useAppSelector((state) => state.datasets.columns);
  const shouldRunEval = useAppSelector(shouldEval);
  const shouldRunPred = useAppSelector(shouldPredict);

  const [activePageInd, setActivePageInd] = useState(0);
  const [activeSubPageInd, setActiveSubPageInd] = useState(0);

  const [errorMessage, setErrorMessage] = useState<ReactElement>();

  const [currChartConfig, setCurrChartConfig] = useState<PredictionConfig>({
    showUncertainty: true,
    showTrend: false,
    showEvents: false,
    showHistory: true,
  });

  const processError = (err: any) => {
    if (err instanceof ZodError) {
      setErrorMessage(
        errorToastWithMessage("The model configuration was invalid.")
      );
    } else if (err.message) {
      const error = err as HTTPError;
      setErrorMessage(
        errorToastWithMessage("Something went wrong: " + error.message)
      );
    } else if (err.detail) {
      if (err.detail instanceof Array) {
        const error = err as ValidationError;
        setErrorMessage(
          errorToastWithMessage("The model configuration was invalid.")
        );
      } else {
        const error = err as NeuralProphetError;
        setErrorMessage(
          errorToastWithMessage("Neural Prophet failed: " + error.detail)
        );
      }
    } else {
      setErrorMessage(errorToastWithMessage("An unknown error occured."));
    }
  };

  const predict = async () => {
    try {
      await dispatch(
        apiPrediction({
          dataset: transformDataset(dataset, modelConfiguration, columns),
          configuration: modelConfiguration,
        })
      ).unwrap();
    } catch (err: any) {
      processError(err);
    }
  };

  const validate = async () => {
    try {
      await dispatch(
        validateModel({
          dataset: transformDataset(dataset, modelConfiguration, columns),
          configuration: modelConfiguration,
        })
      ).unwrap();
    } catch (err: any) {
      processError(err);
    }
  };

  function getPageComponent(pageInd: number, subPageInd: number) {
    const pageName = pages[pageInd].pageName;
    switch (pageName) {
      case "Model Evaluation":
        return <Validation view={modelEvaluationSubPage[subPageInd]} />;
      case "Prediction":
        return (
          <PredictionView
            chartConfig={currChartConfig}
            stalePrediction={shouldRunPred}
            predict={predict}
          />
        );
      case "Model Configuration":
        return (
          <ModelConfiguration
            onSelectionChange={(newSelection) => {
              const newInd = modelConfigSubPage.findIndex(
                (val) => val === newSelection
              );
              setActiveSubPageInd(newInd);
            }}
          />
        );
      case "Data Selector":
        return (
          <DataSelectorPage selectedSubPage={dataSelectorSubPage[subPageInd]} />
        );
    }
  }

  const handleNavClick = (
    pageInd: number,
    subPageInd: number,
    event: React.MouseEvent<HTMLElement>
  ) => {
    // Prevent any href from the nav click
    event.preventDefault();

    // Do page specific computations
    if (pageInd === Pages.ModelConfiguration) {
      location.href = `#${modelConfigSubPage[subPageInd]}`;
    }

    if (
      activePageInd !== Pages.ModelEvaluation &&
      pageInd === Pages.ModelEvaluation &&
      shouldRunEval
    ) {
      validate();
    }

    setActivePageInd(pageInd);
    setActiveSubPageInd(subPageInd);
  };

  return (
    <div className="row align-items-start">
      <div className="col-2 sidebar--div">
        <SideBar
          activePageInd={activePageInd}
          activeSubPageInd={activeSubPageInd}
          chartConfig={currChartConfig}
          onNavClick={handleNavClick}
          onPredictionConfigChange={setCurrChartConfig}
        />
      </div>
      <div className="col-10">
        {getPageComponent(activePageInd, activeSubPageInd)}
      </div>
      <CToaster push={errorMessage} placement="bottom-end" />
    </div>
  );
}
