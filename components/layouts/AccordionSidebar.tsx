import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
} from "@coreui/react";

export default function AccordionSidebar() {
  return (
    <div>
      <CButton>Home</CButton>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            <CButton onClick={() => console.log("Test")}>Test</CButton>
          </CAccordionHeader>
          <CAccordionBody>
            <p>Test</p>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem onClick={() => console.log("Test")} itemKey={2}>
          <CAccordionHeader>Test</CAccordionHeader>
          <CAccordionBody>
            <p>Test</p>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={3}>
          <CAccordionHeader>Test</CAccordionHeader>
          <CAccordionBody>
            <p>Test</p>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </div>
  );
}
