import { CButton, CButtonGroup } from "@coreui/react";

export default function ModelConfigurationSidepanel({
  selectedMenuOption,
}: {
  selectedMenuOption: string;
}) {
  return (
    <div className="row">
      <CButtonGroup vertical>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={selectedMenuOption === "dataset-info" ? "light" : "dark"}
          href="#dataset-info"
        >
          Dataset Info
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={selectedMenuOption === "underlying-trends" ? "light" : "dark"}
          href="#underlying-trends"
        >
          Underlying Trends
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={
            selectedMenuOption === "modeling-assumptions" ? "light" : "dark"
          }
          href="#modeling-assumptions"
        >
          Modeling Assumptions
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={
            selectedMenuOption === "training-configuration" ? "light" : "dark"
          }
          href="#training-configuration"
        >
          Training Configuration
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={
            selectedMenuOption === "validation-configuration" ? "light" : "dark"
          }
          href="#validation-configuration"
        >
          Validation Configuration
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={
            selectedMenuOption === "prediction-configuration" ? "light" : "dark"
          }
          href="#prediction-configuration"
        >
          Prediction Configuration
        </CButton>
      </CButtonGroup>
    </div>
  );
}
