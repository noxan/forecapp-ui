import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormInput,
} from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { editModelConfig } from "../../src/store/models";
import { selectModelConfiguration } from "../../src/store/selectors";

const placeholderText = (
  <>
    <strong>This is the first item&apos;s accordion body.</strong> It is hidden
    by default, until the collapse plugin adds the appropriate classes that we
    use to style each element. These classes control the overall appearance, as
    well as the showing and hiding via CSS transitions. You can modify any of
    this with custom CSS or overriding our default variables. It&apos;s also
    worth noting that just about any HTML can go within the{" "}
    <code>.accordion-body</code>, though the transition does limit overflow.
  </>
);

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
        <CAccordionBody>{/* TODO */}</CAccordionBody>
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
