import { useAppSelector } from "../../src/hooks";
import { selectTargetColumn } from "../../src/store/selectors";
import { PredictionChart } from "./Chart";

export type PredictionChartConfig = {
  showUncertainty: boolean;
  showTrend: boolean;
  showEvents: boolean;
};

export default function PredictionView() {
  const predictionData = useAppSelector((state) => state.datasets.prediction);
  const targetColumn = useAppSelector(selectTargetColumn);
  return (
    <PredictionChart
      forecast={predictionData.forecast}
      targetColumn={targetColumn}
      numForecasts={predictionData.configuration?.forecasts}
      showUncertainty={true}
      showEvents={false}
      showTrend={false}
    />
  );
}
