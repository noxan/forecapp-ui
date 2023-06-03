import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function MenuProgressBar({ activeStep }: any) {
  return (
    <div className="menu-progress-bar">
      <Stepper alternativeLabel activeStep={activeStep}>
        <Step key="Data Selector">
          <StepLabel icon={false}>Data Selector</StepLabel>
        </Step>
        <Step key="Model Configuration">
          <StepLabel>Model Configuration</StepLabel>
        </Step>
        <Step key="Prediction">
          <StepLabel>Prediction</StepLabel>
        </Step>
        <Step key="Validation">
          <StepLabel>Validation</StepLabel>
        </Step>
      </Stepper>
    </div>
  );
}
