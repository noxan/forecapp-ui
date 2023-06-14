import ConfigurationCard from "../components/ModelConfiguration/ConfigurationCard";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { editModelConfig } from "../src/store/models";
import {
  selectDataset,
  selectModelConfiguration,
  selectTargetColumn,
  selectTimeColumn,
} from "../src/store/selectors";
import { CFormCheck, CFormInput } from "@coreui/react";
import { trendExplanation } from "../components/ModelConfiguration/ConfigExplanations";

export default function ModelConfiguration() {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();
  return (
    <div>
      <ConfigurationCard explanation={trendExplanation} title="Trend">
        <CFormCheck
          id="trend"
          label="Enable trend"
          defaultChecked={modelConfiguration.trend.growth === "linear"}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                trend: { growth: e.target.checked ? "linear" : "off" },
              })
            )
          }
        ></CFormCheck>
        Number of changepoints{" "}
        <CFormInput
          type="number"
          min={0}
          disabled={modelConfiguration.trend.growth === "off"}
          defaultValue={modelConfiguration.trend.numberOfChangepoints}
          onChange={(e) => {
            dispatch(
              editModelConfig({
                trend: {
                  numberOfChangepoints: Number(e.target.value),
                },
              })
            );
          }}
        ></CFormInput>
      </ConfigurationCard>
    </div>
  );
}
