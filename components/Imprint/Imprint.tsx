import { CButton } from "@coreui/react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import NpLogo from "../../src/images/np_highres.svg";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import GradingRoundedIcon from "@mui/icons-material/GradingRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import Image from "next/image";
import UploadPage from "../../src/images/data_upload_trimmed.gif";
import DataViewerPage from "../../src/images/data_viewer.gif";
import ValidationPage from "../../src/images/validation_screen_2.gif";
import ModelConfigPage from "../../src/images/model_config.gif";
import PredictionPage from "../../src/images/prediction_page.gif";

export default function Imprint() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div color="#2C92FF">
      <div className="row align-items-start">
        <div className="col">
          <h1>Forecapp</h1>
        </div>
        <div className="col">
          <CButton
            color="secondary"
            variant="outline"
            href="https://arxiv.org/abs/2111.15397"
            target="_blank"
          >
            <AttachFileIcon />
            Paper
          </CButton>
          <CButton
            color="secondary"
            variant="outline"
            href="https://neuralprophet.com/"
            target="_blank"
          >
            <NpLogo />
          </CButton>
          <CButton
            color="secondary"
            variant="outline"
            href="https://github.com/noxan/forecapp-ui/tree/main"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-github mr-2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Contribute
          </CButton>
        </div>
      </div>
      <p>
        Time series forecasting made simple, based on the NeuralProphet python
        package.
      </p>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel
            StepIconComponent={UploadIcon}
            onClick={() => setActiveStep(0)}
          >
            Upload your Dataset
          </StepLabel>
          <StepContent>
            <p>
              Either upload your own time-series dataset or try with one of our
              sample datasets
            </p>
            <Image src={UploadPage} width={400} alt="Upload Page" />
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            StepIconComponent={GradingRoundedIcon}
            onClick={() => setActiveStep(1)}
          >
            Browse your Dataset
          </StepLabel>
          <StepContent>
            <p>
              View your time-series data in a plot, select what column is your
              time column and which one is the column you want to predict. You
              can also view some key metrics of the data.
            </p>
            <Image src={DataViewerPage} width={400} alt="Upload Page" />
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            StepIconComponent={BuildCircleRoundedIcon}
            onClick={() => setActiveStep(2)}
          >
            Configure your Model
          </StepLabel>
          <StepContent>
            <p>
              Configure the parameters of the model, like underlying trends or
              special events that should be considered.
            </p>
            <Image src={ModelConfigPage} width={400} alt="Upload Page" />
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            StepIconComponent={PublishedWithChangesRoundedIcon}
            onClick={() => setActiveStep(3)}
          >
            Validate your Model
          </StepLabel>
          <StepContent>
            <p>
              Validate the performance of your model on your dataset. You can
              iterate in this step, going back and forth between model
              configuration and validation to find the best model.
            </p>
            <Image src={ValidationPage} width={400} alt="Upload Page" />
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            StepIconComponent={AutoGraphRoundedIcon}
            onClick={() => setActiveStep(4)}
          >
            Create your final prediction
          </StepLabel>
          <StepContent>
            <p>
              Choose your final model and make a prediction on the full dataset.
            </p>
            <Image src={PredictionPage} width={400} alt="Upload Page" />
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
}
