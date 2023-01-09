import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CFormInput,
  CFormRange,
} from "@coreui/react";
import { detectResolution } from "../../src/helpers";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import {
  selectDataset,
  selectModelConfiguration,
  selectTargetColumn,
  selectTimeColumn,
} from "../../src/store/selectors";
import HolidayBuilder from "./HolidayBuilder";
import LaggedRegressorBuilder from "./LaggedRegressorBuilder";
import Info from "../Info";

const transformEmptyToNull = (value: any) => (value === "" ? null : value);

const PredictionBuilder = () => {
  const dataset = useAppSelector(selectDataset);
  const columnHeaders = Object.keys(dataset[0]);
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();

  const laggedRegressorColumns = columnHeaders.filter(
    (column) => column !== timeColumn && column !== targetColumn
  );

  const resolution = detectResolution(dataset, timeColumn);

  return (
    <CAccordion activeItemKey={10}>
      <CAccordionItem itemKey={10}>
        <CAccordionHeader>Forecast horizon</CAccordionHeader>
        <CAccordionBody>
          How far should the model predict into the future? The unit is based on
          your dataset in <b>{resolution}</b>.
          <CFormInput
            type="number"
            defaultValue={modelConfiguration.forecasts}
            placeholder="Number of values to forecast..."
            onChange={(e) =>
              dispatch(editModelConfig({ forecasts: e.target.value }))
            }
          />
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={12}>
        <CAccordionHeader>Trend</CAccordionHeader>
        <CAccordionBody>
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
          />
          Number of changepoints{" "}
          <Info>
            Trend change points, also known as inflection points, are points in
            a data series where the direction of the trend changes. For example,
            if a data series is trending upwards and then begins to trend
            downwards, the point where the upward trend ends and the downward
            trend begins is a trend change point.
          </Info>
          <CFormInput
            type="number"
            min={0}
            disabled={modelConfiguration.trend.growth === "off"}
            defaultValue={modelConfiguration.trend.numberOfChangepoints}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  trend: {
                    numberOfChangepoints: parseInt(e.target.value, 10),
                  },
                })
              )
            }
          />
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={14}>
        <CAccordionHeader>Seasonality</CAccordionHeader>
        <CAccordionBody>
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
          {/* <div>Custom - TODO</div> */}
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={20}>
        <CAccordionHeader>Auto regression</CAccordionHeader>
        <CAccordionBody>
          How many previous values should be used to predict the next value?
          <Info>
            Autoregression uses previous values of a time-series to predict the
            value of the next time point. It is based on the assumption that the
            past values of a time-series are related to the future values in a
            linear way. The optimal value for an autoregressive model is
            determined by the complexity of the relationship between the past
            and future values in the time-series data. A larger value may
            capture more of this complexity, but it may also increase the risk
            of overfitting, where the model fits the training data too closely
            and may not generalize well to new data. On the other hand, a
            smaller value may not capture enough complexity and may result in a
            model with lower accuracy.
          </Info>
          <CFormInput
            className="mb-4"
            type="number"
            placeholder="off"
            min={0}
            defaultValue={modelConfiguration.autoregression.lags}
            onChange={(e) =>
              dispatch(
                editModelConfig({ autoregression: { lags: e.target.value } })
              )
            }
          />
          <CFormRange
            min={0}
            max={1}
            step={0.01}
            label={`Regularization (${modelConfiguration.autoregression.regularization})`}
            defaultValue={modelConfiguration.autoregression.regularization}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  autoregression: { regularization: e.target.value },
                })
              )
            }
          />
        </CAccordionBody>
      </CAccordionItem>

      {/* <CAccordionItem itemKey={40}>
        <CAccordionHeader>Events</CAccordionHeader>
        <CAccordionBody>TODO</CAccordionBody>
      </CAccordionItem> */}

      <CAccordionItem itemKey={50}>
        <CAccordionHeader>Holidays</CAccordionHeader>
        <CAccordionBody>
          Which country specific holidays should be considered?
          <HolidayBuilder
            modelConfiguration={modelConfiguration}
            updateConfig={(config: any) => dispatch(editModelConfig(config))}
          />
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={55}>
        <CAccordionHeader>Regressors</CAccordionHeader>
        <CAccordionBody>
          Are there any variables or values which have an influence on our
          prediction? (e.g. weather forecast for solar power production)
          <LaggedRegressorBuilder
            laggedRegressorColumns={laggedRegressorColumns}
            modelConfiguration={modelConfiguration}
            updateConfig={(config: any) => dispatch(editModelConfig(config))}
          />
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={60}>
        <CAccordionHeader>Training</CAccordionHeader>
        <CAccordionBody>
          How many epochs to train?
          <CFormInput
            type="number"
            placeholder="auto"
            min={1}
            defaultValue={modelConfiguration.training.epochs}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  training: { epochs: transformEmptyToNull(e.target.value) },
                })
              )
            }
          />
          <CFormCheck
            id="earlyStopping"
            label="Stop training early if no improvement is seen"
            defaultChecked={modelConfiguration.training.earlyStopping}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  training: { earlyStopping: e.target.checked },
                })
              )
            }
          />
          <h5 className="mt-3">Advanced options</h5>
          Learning rate
          <CFormInput
            type="number"
            placeholder="auto"
            defaultValue={modelConfiguration.training.learningRate}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  training: {
                    learningRate: transformEmptyToNull(e.target.value),
                  },
                })
              )
            }
          />
          Batch size
          <CFormInput
            type="number"
            placeholder="auto"
            defaultValue={modelConfiguration.training.batchSize}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  training: { batchSize: transformEmptyToNull(e.target.value) },
                })
              )
            }
          />
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  );
};

export default PredictionBuilder;
