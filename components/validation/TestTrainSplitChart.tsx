import PlotlyChart from "../Plotly";
import { transformPredictionData } from "../prediction/Chart";

export type TestTrainSplitChartProps = {
  prediction: any;
  holdoutFraction: number;
  targetColumn: string;
  showUncertainty: boolean;
  showTrend: boolean;
  showEvents: boolean;
  confidenceLevel: number;
};

export function TestTrainSplitChart(props: TestTrainSplitChartProps) {
  const ds = Object.values(props.prediction.ds) as any[];
  const offset = (ds.length * props.holdoutFraction) | 0;

  return (
    <PlotlyChart
      useResizeHandler
      data={transformPredictionData(
        props.prediction,
        props.showUncertainty,
        props.showTrend,
        props.showEvents,
        props.confidenceLevel
      )}
      layout={{
        hovermode: "x",
        showlegend: true,
        legend: {
          itemclick: false,
          itemdoubleclick: false,
          orientation: "h",
          y: -0.05,
        },
        margin: { t: 10, r: 30 }, // b: 10, l: 30, pad: 10
        shapes: [
          {
            layer: "below",
            type: "rect",
            yref: "paper",
            y1: 1,
            y0: 0,
            xref: "x",
            x0: ds[ds.length - 1],
            x1: ds[ds.length - offset - 1],
            opacity: 0.25,
            fillcolor: "grey",
            line: {
              width: 0,
            },
          },
        ],
        yaxis: {
          title: { text: props.targetColumn },
        },
      }}
      config={{
        responsive: true,
      }}
      style={{ width: "100%", minHeight: "85vh" }}
    />
  );
}
