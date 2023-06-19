import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CNavGroup,
  CNavItem,
  CNavLink,
  CSidebar,
  CSidebarNav,
} from "@coreui/react";
import HomeIcon from "@mui/icons-material/Home";
import { ReactElement } from "react";

export type AccordionSideBarProps = {
  content: AccordionSideBarGroupProps[];
  activePageInd: number;
  activeSubPageInd: number;
  onNavClick: (
    pageInd: number,
    subPageInd: number,
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

export type AccordionSideBarGroupProps = {
  pageName: string;
  subPages: (string | ReactElement)[];
};

export default function AccordionSideBar(props: AccordionSideBarProps) {
  return (
    <CSidebar position="sticky">
      <CSidebarNav>
        <CNavItem href="/">
          <HomeIcon
            sx={{
              width: "2em",
              alignContent: "center",
              justifyContent: "flex-start",
              display: "flex",
            }}
          />
          Home
        </CNavItem>
        {props.content.map((sideBarGroup, pageInd) => {
          if (sideBarGroup.subPages.length === 0) {
            return (
              <CNavItem key={pageInd}>
                <CNavLink
                  active={props.activePageInd === pageInd}
                  onClick={(event) => props.onNavClick(pageInd, -1, event)}
                >
                  {sideBarGroup.pageName}
                </CNavLink>
              </CNavItem>
            );
          }
          return (
            <CNavGroup toggler={sideBarGroup.pageName} key={pageInd}>
              {sideBarGroup.subPages.map((subPage, subPageInd) => {
                if (typeof subPage === "string") {
                  return (
                    <CNavItem key={subPageInd}>
                      <CNavLink
                        active={
                          props.activePageInd === pageInd &&
                          props.activeSubPageInd === subPageInd
                        }
                        onClick={(event) =>
                          props.onNavClick(pageInd, subPageInd, event)
                        }
                      >
                        {subPage}
                      </CNavLink>
                    </CNavItem>
                  );
                }
                return subPage;
              })}
            </CNavGroup>
          );
        })}
      </CSidebarNav>
    </CSidebar>
  );
}
