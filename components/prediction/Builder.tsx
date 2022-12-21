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
    <CAccordion activeItemKey={1}>
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>Forecast</CAccordionHeader>
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
      <CAccordionItem itemKey={2}>
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

      {new Array(9)
        .fill(0)
        .map((_, index) => index + 3)
        .map((index) => (
          <CAccordionItem key={index} itemKey={index}>
            <CAccordionHeader>Accordion Item #{index}</CAccordionHeader>
            <CAccordionBody>{placeholderText}</CAccordionBody>
          </CAccordionItem>
        ))}
    </CAccordion>
  );
};

export default PredictionBuilder;
