import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CBadge,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { capitalize } from "../../src/helpers";
import { countryHolidays } from "../../src/holidays";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import { selectModelConfiguration } from "../../src/store/selectors";

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
        <CAccordionBody>{/* TODO */}</CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={14}>
        <CAccordionHeader>Seasonality</CAccordionHeader>
        <CAccordionBody>{/* TODO */}</CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={20}>
        <CAccordionHeader>Auto regression</CAccordionHeader>
        <CAccordionBody>
          How many previous values should be used to predict the next value?
          <CFormInput
            type="number"
            defaultValue={modelConfiguration?.autoRegression?.lags}
            onChange={(e) =>
              dispatch(
                editModelConfig({ autoRegression: { lags: e.target.value } })
              )
            }
          />
          Regularization?
          <CFormInput
            type="number"
            defaultValue={modelConfiguration?.autoRegression?.regularization}
            onChange={(e) =>
              dispatch(
                editModelConfig({
                  autoRegression: { regularization: e.target.value },
                })
              )
            }
          />
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={40}>
        <CAccordionHeader>Events</CAccordionHeader>
        <CAccordionBody>{/* TODO */}</CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={50}>
        <CAccordionHeader>Holidays</CAccordionHeader>
        <CAccordionBody>
          Which country specific holidays should be considered?
          <div>
            {modelConfiguration?.holidays?.map((code: string) => (
              <CBadge
                key={code}
                color="secondary"
                className="m-1"
                onClick={() =>
                  dispatch(
                    editModelConfig({
                      holidays: (modelConfiguration?.holidays || []).filter(
                        (item: string) => item !== code
                      ),
                    })
                  )
                }
              >
                {countryHolidays[code]}
              </CBadge>
            ))}
          </div>
          <CFormSelect
            onChange={async (evt) => {
              const value = evt.target.value;
              if (value !== "Add country holidays") {
                if (!modelConfiguration?.holidays?.includes(value)) {
                  await dispatch(
                    editModelConfig({
                      holidays: [
                        value,
                        ...(modelConfiguration?.holidays || []),
                      ],
                    })
                  );
                }
                evt.target.value = "Add country holidays";
              }
            }}
          >
            <option>Add country holidays</option>
            {Object.entries(countryHolidays).map(([code, country]) => (
              <option key={code} value={code}>
                {country}
              </option>
            ))}
          </CFormSelect>
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={55}>
        <CAccordionHeader>Indicators (regressors)</CAccordionHeader>
        <CAccordionBody>
          Which other columns should be used to enhance the prediction?
          {/* TODO */}
        </CAccordionBody>
      </CAccordionItem>

      <CAccordionItem itemKey={60}>
        <CAccordionHeader>Training</CAccordionHeader>
        <CAccordionBody>
          How many epochs to train?
          <CFormInput
            type="number"
            defaultValue={modelConfiguration.training.epochs}
            onChange={(e) =>
              dispatch(
                editModelConfig({ training: { epochs: e.target.value } })
              )
            }
          />
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  );
};

export default PredictionBuilder;
