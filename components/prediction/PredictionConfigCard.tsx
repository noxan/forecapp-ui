import { CCard, CCardBody, CFormSwitch } from "@coreui/react";

export type PredictionConfig = {
  showUncertainty: boolean;
  showTrend: boolean;
  showEvents: boolean;
  showHistory: boolean;
};

export default function PredictionConfigCard(props: {
  config: PredictionConfig;
  updateConfig: (newConfig: PredictionConfig) => void;
}) {
  return (
    <>
      <CFormSwitch
        label="Show Uncertainty"
        checked={props.config.showUncertainty}
        onChange={(event) =>
          props.updateConfig({
            ...props.config,
            showUncertainty: event.target.checked,
          })
        }
      />
      <CFormSwitch
        label="Show Trend"
        checked={props.config.showTrend}
        onChange={(event) =>
          props.updateConfig({
            ...props.config,
            showTrend: event.target.checked,
          })
        }
      />
      <CFormSwitch
        label="Show Events"
        checked={props.config.showEvents}
        onChange={(event) =>
          props.updateConfig({
            ...props.config,
            showEvents: event.target.checked,
          })
        }
      />
      <CFormSwitch
        label="Show History"
        checked={props.config.showHistory}
        onChange={(event) =>
          props.updateConfig({
            ...props.config,
            showHistory: event.target.checked,
          })
        }
      />
    </>
  );
}
