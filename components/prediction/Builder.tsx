import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from "@coreui/react";

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

const PredictionBuilder = () => (
  <CAccordion activeItemKey={1}>
    <CAccordionItem itemKey={1}>
      <CAccordionHeader>Forecast</CAccordionHeader>
      <CAccordionBody>
        How far should the model predict into the future?
      </CAccordionBody>
    </CAccordionItem>

    {new Array(9)
      .fill(0)
      .map((_, index) => index + 2)
      .map((index) => (
        <CAccordionItem key={index} itemKey={index}>
          <CAccordionHeader>Accordion Item #{index}</CAccordionHeader>
          <CAccordionBody>{placeholderText}</CAccordionBody>
        </CAccordionItem>
      ))}
  </CAccordion>
);

export default PredictionBuilder;
