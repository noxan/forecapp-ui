import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import {
  selectDataset,
  selectModelConfiguration,
  selectTargetColumn,
  selectTimeColumn,
} from "../../src/store/selectors";
import { CFormCheck, CFormInput } from "@coreui/react";
import {
  trendExplanation,
  seasonalityExplanation,
  seasonalityDocumentationLink,
  trendDocumentationLink,
} from "../../components/ModelConfiguration/ConfigExplanations";

export default function UnderlyingTrends() {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();
  return (
    <div data-section id="underlying-trends">
      <h2 className="mb-4">Underlying Trends</h2>
      <ConfigurationCard
        explanation={trendExplanation}
        documentationLink={trendDocumentationLink}
        title="Trend"
      >
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
      <ConfigurationCard
        explanation={seasonalityExplanation}
        title="Seasonality"
        documentationLink={seasonalityDocumentationLink}
      >
        <CFormCheck
          id="seasonalityDaily"
          label="Enable daily seasonality"
          defaultChecked={modelConfiguration.seasonality.daily}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                seasonality: { daily: e.target.checked },
              })
            )
          }
        />
        <CFormCheck
          id="seasonalityWeekly"
          label="Enable weekly seasonality"
          defaultChecked={modelConfiguration.seasonality.weekly}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                seasonality: { weekly: e.target.checked },
              })
            )
          }
        />
        <CFormCheck
          id="seasonalityYearly"
          label="Enable yearly seasonality"
          defaultChecked={modelConfiguration.seasonality.yearly}
          onChange={(e) =>
            dispatch(
              editModelConfig({
                seasonality: { yearly: e.target.checked },
              })
            )
          }
        />
      </ConfigurationCard>
    </div>
  );
}
