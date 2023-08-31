import doge from "../src/images/screen.png";
import QuickStartCard from "../components/documentation/QuickStartCard";

export type ImprintViewMode = "Imprint";

export default function Imprint() {
  return (
    <div>
      <h1>Forecapp</h1>
      <p>
        Forecapp is a web app that gives easy, no-code access to explainable,
        robust, time series forecasting tools. In the backend, forecapp is based
        on the{" "}
        <a href="https://neuralprophet.com/" target="_blank" rel="noreferrer">
          NeuralProphet
        </a>{" "}
        framework for explainable time-series forecasting. It is a python
        package that can be used to build explainable time-series forecasting
        models. Forecapp takes the functionality of NeuralProphet and makes it
        accessible to people who do not know how to code.
      </p>
      <QuickStartCard text="Upload your data" img={doge}></QuickStartCard>
      <QuickStartCard text="Configure your model" img={doge}></QuickStartCard>
      <QuickStartCard text="Tune" img={doge}></QuickStartCard>
      <h2>Resources</h2>
      <ul>
        <li>
          GitHub <a href="https://github.com/noxan/forecapp/">frontend</a>
        </li>
        <li>
          GitHub <a href="https://github.com/noxan/forecapp-api">backend</a>
        </li>
        <li>
          <a href="https://neuralprophet.com/">NeuralProphet</a>
        </li>
      </ul>
    </div>
  );
}
