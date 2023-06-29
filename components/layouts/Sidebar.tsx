import {
  CNavGroup,
  CNavItem,
  CNavLink,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
} from "@coreui/react";
import HomeIcon from "@mui/icons-material/Home";
import PredictionConfigCard, {
  PredictionConfig,
} from "../prediction/PredictionConfigCard";

export type SideBarProps = {
  activePageInd: number;
  activeSubPageInd: number;
  chartConfig: PredictionConfig;
  onNavClick: (
    pageInd: number,
    subPageInd: number,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onPredictionConfigChange: (newConfig: PredictionConfig) => void;
};

export default function SideBar(props: SideBarProps) {
  return (
    <CSidebar position="sticky">
      <CSidebarBrand>
        <CNavLink href="https://neuralprophet.com/" target="_blank">
          Forecapp
        </CNavLink>
      </CSidebarBrand>
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
        <CNavGroup
          toggler={"Home"}
          key={"Home"}
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(0, 0, event);
            }
          }}
        >
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 4 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(0, 0, event);
              }}
            >
              Data Upload
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 4 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(0, 1, event);
              }}
            >
              Sample Data
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler={"Data Selector"}
          key="Data Selector"
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(1, 0, event);
            }
          }}
        >
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(1, 0, event);
              }}
            >
              Data Upload
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(1, 1, event);
              }}
            >
              View Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(1, 2, event);
              }}
            >
              Visualize Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 3}
              onClick={(event) => {
                props.onNavClick(1, 3, event);
              }}
            >
              Table View
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler={"Model Configuration"}
          key="Model Configuration"
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(2, 0, event);
            }
          }}
        >
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(2, 0, event);
              }}
            >
              Data Selector
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(2, 1, event);
              }}
            >
              View Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(2, 2, event);
              }}
            >
              Visualize Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 3}
              onClick={(event) => {
                props.onNavClick(2, 3, event);
              }}
            >
              Modeling Assumptions
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 4}
              onClick={(event) => {
                props.onNavClick(2, 4, event);
              }}
            >
              Training Configuration
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 5}
              onClick={(event) => {
                props.onNavClick(2, 5, event);
              }}
            >
              Validation Configuration
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler={"Model Evaluation"}
          key="Model Evaluation"
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(3, 0, event);
            }
          }}
        >
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 2 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(3, 0, event);
              }}
            >
              Test Train Split
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 2 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(3, 1, event);
              }}
            >
              Model Parameters
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 2 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(3, 2, event);
              }}
            >
              Previous Performance
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler="Prediction"
          visible={props.activePageInd === 3}
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(4, -1, event);
            }
          }}
        >
          <PredictionConfigCard
            key="prediction-card"
            config={props.chartConfig}
            updateConfig={props.onPredictionConfigChange}
          />
          <CNavItem>
            <CNavLink onClick={(event) => props.onNavClick(4, 0, event)}>
              Export
            </CNavLink>
          </CNavItem>
        </CNavGroup>
      </CSidebarNav>
    </CSidebar>
  );
}
