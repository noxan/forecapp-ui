import { CButton, CButtonGroup } from "@coreui/react";

export default function ModelConfigurationSidepanel({
  selectedMenuOption,
  setSelectedMenuOption,
}: {
  selectedMenuOption: string;
  setSelectedMenuOption: (selectedMenuOption: string) => void;
}) {
  return (
    <div className="row">
      <CButtonGroup vertical>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={selectedMenuOption === "dataset-info" ? "light" : "dark"}
          onClick={() => setSelectedMenuOption("dataset-info")}
        >
          Dataset Info
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={selectedMenuOption === "underlying-trends" ? "light" : "dark"}
          onClick={() => setSelectedMenuOption("underlying-trends")}
        >
          Underlying Trends
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={
            selectedMenuOption === "modeling-assumptions" ? "light" : "dark"
          }
          onClick={() => setSelectedMenuOption("modeling-assumptions")}
        >
          Modeling Assumptions
        </CButton>
        <CButton
          className="btn btn-primary"
          shape="rounded-0"
          color={
            selectedMenuOption === "training-configuration" ? "light" : "dark"
          }
          onClick={() => setSelectedMenuOption("training-configuration")}
        >
          Training Configuration
        </CButton>
      </CButtonGroup>
    </div>
  );
}
