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

const vars = {
  "--cui-sidebar-bg": "#2d92ff",
};

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
    <CSidebar style={vars} position="sticky">
      <CSidebarBrand
        onClick={(event) => {
          props.onNavClick(4, 0, event);
        }}
      >
        Forecapp
      </CSidebarBrand>
      <CSidebarNav>
        <CNavGroup
          toggler={"1. Data"}
          key="Data Selector"
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(0, 0, event);
            }
          }}
          visible={props.activePageInd === 0}
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
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(0, 1, event);
              }}
            >
              Data Selector
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(0, 2, event);
              }}
            >
              View Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 3}
              onClick={(event) => {
                props.onNavClick(0, 3, event);
              }}
            >
              Visualize Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 0 && props.activeSubPageInd === 4}
              onClick={(event) => {
                props.onNavClick(0, 4, event);
              }}
            >
              Table View
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler={"2. Model"}
          key="Model Configuration"
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(1, 0, event);
            }
          }}
          visible={props.activePageInd === 1}
        >
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(1, 0, event);
              }}
            >
              Prediction Configuration
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(1, 1, event);
              }}
            >
              Dataset Info
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(1, 2, event);
              }}
            >
              Underlying Trends
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 3}
              onClick={(event) => {
                props.onNavClick(1, 3, event);
              }}
            >
              Modeling Assumptions
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 4}
              onClick={(event) => {
                props.onNavClick(1, 4, event);
              }}
            >
              Training Configuration
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 1 && props.activeSubPageInd === 5}
              onClick={(event) => {
                props.onNavClick(1, 5, event);
              }}
            >
              Validation Configuration
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler={"3. Evaluation"}
          key="Model Evaluation"
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(2, 0, event);
            }
          }}
          visible={props.activePageInd === 2}
        >
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 2 && props.activeSubPageInd === 0}
              onClick={(event) => {
                props.onNavClick(2, 0, event);
              }}
            >
              Test Train Split
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 2 && props.activeSubPageInd === 1}
              onClick={(event) => {
                props.onNavClick(2, 1, event);
              }}
            >
              Model Parameters
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={props.activePageInd === 2 && props.activeSubPageInd === 2}
              onClick={(event) => {
                props.onNavClick(2, 2, event);
              }}
            >
              Previous Performance
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler="4. Prediction"
          visible={props.activePageInd === 3}
          onClick={(event) => {
            if (event.target.className.split(" ")[1] === "nav-group-toggle") {
              props.onNavClick(3, -1, event);
            }
          }}
        >
          <PredictionConfigCard
            key="prediction-card"
            config={props.chartConfig}
            updateConfig={props.onPredictionConfigChange}
          />
          <CNavItem>
            <CNavLink onClick={(event) => props.onNavClick(3, 0, event)}>
              Export
            </CNavLink>
          </CNavItem>
        </CNavGroup>
      </CSidebarNav>
    </CSidebar>
  );
}
