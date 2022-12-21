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
    {new Array(10).fill(0).map((_, index) => (
      <CAccordionItem key={index} itemKey={index + 1}>
        <CAccordionHeader>Accordion Item #{index + 1}</CAccordionHeader>
        <CAccordionBody>{placeholderText}</CAccordionBody>
      </CAccordionItem>
    ))}
  </CAccordion>
);

export default PredictionBuilder;
