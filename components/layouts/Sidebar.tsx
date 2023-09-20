import {
  CNavGroup,
  CNavItem,
  CNavLink,
  CSidebar,
  CSidebarNav,
} from "@coreui/react";
import PredictionConfigCard, {
  PredictionConfig,
} from "../prediction/PredictionConfigCard";
import { ClickableSidebarNavGroup } from "./ClickableSidebarNavGroup";

export type SideBarProps = {
  activePageInd: number;
  activeSubPageInd: number;
  chartConfig: PredictionConfig;
  dataUploaded: boolean;
  configured: boolean;
  columnsChosen: boolean;
  visible: boolean;
  onNavClick: (
    pageInd: number,
    subPageInd: number,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onPredictionConfigChange: (newConfig: PredictionConfig) => void;
  onHide: () => void;
};

export default function SideBar(props: SideBarProps) {
  return (
    <CSidebar position="sticky" visible={props.visible} onHide={props.onHide}>
      <CSidebarNav>
        <ClickableSidebarNavGroup
          toggler={"Home"}
          key={"Home"}
          onClick={(event) => props.onNavClick(0, 0, event)}
        >
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(0, 0, event);
              }}
            >
              Data Upload
            </CNavLink>
          </CNavItem>
          {typeof window === "undefined" && (
            <CNavItem>
              <CNavLink
                active={
                  props.activePageInd === 0 && props.activeSubPageInd === 1
                }
                onClick={(event) => {
                  props.onNavClick(0, 1, event);
                }}
              >
                Sample Data
              </CNavLink>
            </CNavItem>
          )}
        </ClickableSidebarNavGroup>
        <ClickableSidebarNavGroup
          toggler={"Data Selector"}
          key="Data Selector"
          onClick={(event) => props.onNavClick(1, 0, event)}
        >
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded}
              active={props.activePageInd === 1 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(1, 0, event);
              }}
            >
              Column Selection
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded}
              active={props.activePageInd === 1 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(1, 1, event);
              }}
            >
              View Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded}
              active={props.activePageInd === 1 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(1, 2, event);
              }}
            >
              Visualize Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded}
              active={props.activePageInd === 1 && props.activeSubPageInd === 3}
              onClick={(event) => {
                props.onNavClick(1, 3, event);
              }}
            >
              Table View
            </CNavLink>
          </CNavItem>
        </ClickableSidebarNavGroup>
        <ClickableSidebarNavGroup
          toggler={"Model Configuration"}
          key="Model Configuration"
          onClick={(event) => props.onNavClick(2, 0, event)}
        >
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded || !props.columnsChosen}
              active={props.activePageInd === 2 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(2, 0, event);
              }}
            >
              Prediction Configuration
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded || !props.columnsChosen}
              active={props.activePageInd === 2 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(2, 1, event);
              }}
            >
              Dataset Info
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded || !props.columnsChosen}
              active={props.activePageInd === 2 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(2, 2, event);
              }}
            >
              Underlying Trends
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded || !props.columnsChosen}
              active={props.activePageInd === 2 && props.activeSubPageInd === 3}
              onClick={(event) => {
                props.onNavClick(2, 3, event);
              }}
            >
              Modeling Assumptions
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded || !props.columnsChosen}
              active={props.activePageInd === 2 && props.activeSubPageInd === 4}
              onClick={(event) => {
                props.onNavClick(2, 4, event);
              }}
            >
              Training Configuration
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={!props.dataUploaded || !props.columnsChosen}
              active={props.activePageInd === 2 && props.activeSubPageInd === 5}
              onClick={(event) => {
                props.onNavClick(2, 5, event);
              }}
            >
              Validation Configuration
            </CNavLink>
          </CNavItem>
        </ClickableSidebarNavGroup>
        <ClickableSidebarNavGroup
          toggler={"Model Evaluation"}
          key="Model Evaluation"
          onClick={(event) => props.onNavClick(3, 0, event)}
        >
          <CNavItem>
            <CNavLink
              disabled={
                !props.dataUploaded || !props.configured || !props.columnsChosen
              }
              active={props.activePageInd === 3 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(3, 0, event);
              }}
            >
              Test Train Split
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={
                !props.dataUploaded || !props.configured || !props.columnsChosen
              }
              active={props.activePageInd === 3 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(3, 1, event);
              }}
            >
              Model Parameters
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              disabled={
                !props.dataUploaded || !props.configured || !props.columnsChosen
              }
              active={props.activePageInd === 3 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(3, 2, event);
              }}
            >
              Previous Performance
            </CNavLink>
          </CNavItem>
        </ClickableSidebarNavGroup>
        <ClickableSidebarNavGroup
          toggler="Prediction"
          key="Prediction"
          onClick={(event) => props.onNavClick(4, 0, event)}
        >
          <PredictionConfigCard
            key="prediction-card"
            config={props.chartConfig}
            updateConfig={props.onPredictionConfigChange}
          />
          <CNavItem>
            <CNavLink
              disabled={
                !props.dataUploaded || !props.configured || !props.columnsChosen
              }
              onClick={(event) => props.onNavClick(4, 1, event)}
            >
              Export
            </CNavLink>
          </CNavItem>
        </ClickableSidebarNavGroup>
      </CSidebarNav>
    </CSidebar>
  );
}
