import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import { selectModelConfiguration } from "../../src/store/selectors";
import ConfigurationCard from "../../components/ModelConfiguration/ConfigurationCard";
import HolidayBuilder from "../../components/prediction/HolidayBuilder";
import { autoRegressionExplanation } from "../../components/ModelConfiguration/ConfigExplanations";

export default function DatasetInfo() {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();
  return (
    <div>
      <ConfigurationCard explanation="Test123" title="Holidays">
        Which country specific holidays should be considered?
        <HolidayBuilder
          modelConfiguration={modelConfiguration}
          updateConfig={(config: any) => dispatch(editModelConfig(config))}
        />
      </ConfigurationCard>
      <ConfigurationCard explanation="Test123" title="Events">
        Here you can add specifal, recurring, single or multiple day events.
      </ConfigurationCard>
    </div>
  );
}
