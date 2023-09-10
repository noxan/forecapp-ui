import { CButton } from "@coreui/react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import NpLogo from "../../src/images/np_highres.svg";

export default function Imprint() {
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
    </div>
  );
}
