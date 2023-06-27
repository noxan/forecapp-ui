import { useAppSelector } from "../../src/hooks";
import PlotlyChart from "../Plotly";

export type ResidualErrorProps = {
  ds: any[];
  y: number[];
  ypredicted: number[];
  holdoutFraction?: number;
};

export default function ResidualErrorChart(props: ResidualErrorProps) {
  const lags = useAppSelector((state) => state.models.autoregression.lags);
  const residual: number[] = props.y
    .map((val, i) => val - props.ypredicted[i])
    .slice(lags);
  const offset = props.holdoutFraction
    ? (props.ds.length * props.holdoutFraction) | 0
    : 0;

  console.log(offset);

  return (
    <PlotlyChart
      useResizeHandler
      data={[
        {
          type: "scattergl",
          mode: "lines",
          line: { color: "#2d92ff", width: 2 },
          name: "Residual Error",
          y: residual,
          x: props.ds,
        },
      ]}
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
            x0: props.ds[props.ds.length - 1],
            x1: props.ds[props.ds.length - offset - 1],
            opacity: 0.25,
            fillcolor: "grey",
            line: {
              width: 0,
            },
          },
        ],
      }}
      config={{
        responsive: true,
      }}
      style={{ width: "100%", minHeight: "85vh" }}
    />
  );
}
