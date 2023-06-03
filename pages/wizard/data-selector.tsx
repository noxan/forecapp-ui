import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CButton,
} from "@coreui/react";
import DatasetTablePreview from "../../components/DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "../../components/DatasetExplorer/DatasetVisualize";
import MenuProgressBar from "../../components/MenuProgressBar";
import HomeIcon from "@mui/icons-material/Home";

export default function WizardDataSelectorPage() {
  return (
    <div className="page-layout">
      <CSidebar>
        <CSidebarNav>
          <CNavItem href="/">
            <HomeIcon />
            Home
          </CNavItem>
          <CNavItem href="/prediction">Model Configuration</CNavItem>
        </CSidebarNav>
      </CSidebar>
      <div className="dataset-preview-layout">
        <MenuProgressBar activeStep={3} />
        <DatasetTablePreview />
        <DatasetVisualize />
      </div>
    </div>
  );
}
