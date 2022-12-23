import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CFormInput,
  CFormRange,
} from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import { selectModelConfiguration } from "../../src/store/selectors";
import HolidayBuilder from "./HolidayBuilder";

const PredictionBuilder = () => {
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const dispatch = useAppDispatch();

  return (
    <CAccordion activeItemKey={10}>
      <CAccordionItem itemKey={10}>
        <CAccordionHeader>Forecast horizon</CAccordionHeader>
        <CAccordionBody>
          How far should the model predict into the future?
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
            defaultChecked={modelConfiguration.trend?.growth === "linear"}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  trend: { growth: e.target.checked ? "linear" : "off" },
                })
              )
            }
          />
          {/* <div>Changepoints - auto</div> */}
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={14}>
        <CAccordionHeader>Seasonality</CAccordionHeader>
        <CAccordionBody>
          <CFormCheck
            id="seasonalityDaily"
            label="Enable daily seasonality"
            defaultChecked={modelConfiguration.seasonality?.daily}
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
            defaultChecked={modelConfiguration.seasonality?.weekly}
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
            defaultChecked={modelConfiguration.seasonality?.yearly}
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
          <CFormInput
            type="number"
            placeholder="off"
            min={0}
            defaultValue={modelConfiguration?.autoregression?.lags}
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
            label="Regularization"
            defaultValue={modelConfiguration?.autoregression?.regularization}
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

      {/* <CAccordionItem itemKey={55}>
        <CAccordionHeader>Indicators (regressors)</CAccordionHeader>
        <CAccordionBody>
          Which other columns should be used to enhance the prediction?
        </CAccordionBody>
      </CAccordionItem> */}

      <CAccordionItem itemKey={60}>
        <CAccordionHeader>Training</CAccordionHeader>
        <CAccordionBody>
          How many epochs to train?
          <CFormInput
            type="number"
            placeholder="auto"
            defaultValue={modelConfiguration.training.epochs}
            onChange={(e) =>
              dispatch(
                editModelConfig({ training: { epochs: e.target.value } })
              )
            }
          />
          <CFormCheck
            id="earlyStopping"
            label="Stop training early if no improvement is seen"
            defaultChecked={modelConfiguration.training?.earlyStopping}
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
                editModelConfig({ training: { learningRate: e.target.value } })
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
                editModelConfig({ training: { batchSize: e.target.value } })
              )
            }
          />
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  );
};

export default PredictionBuilder;
