import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CButton,
} from "@coreui/react";
import DatasetTablePreview from "../../components/DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "../../components/DatasetExplorer/DatasetVisualize";
import HomeIcon from "@mui/icons-material/Home";
import { useAppSelector } from "../../src/hooks";
import { setTimeColumn, setTargetColumn } from "../../src/store/datasets";
import {
  selectTimeColumn,
  selectTargetColumn,
} from "../../src/store/selectors";
import DatasetPreview from "../../components/DatasetExplorer/DatasetPreview";

export default function WizardDataSelectorPage() {
  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);
  return (
    <div className="page-layout">
      <CSidebar position="fixed">
        <CSidebarNav>
          <CNavItem href="/">
            <HomeIcon />
            Home
          </CNavItem>
          <CNavItem href="/prediction?first-run">Model Configuration</CNavItem>
        </CSidebarNav>
      </CSidebar>
      <div className="dataset-preview-layout">
        <DatasetPreview
          timeColumn={timeColumn}
          setTimeColumn={setTimeColumn}
          targetColumn={targetColumn}
          setTargetColumn={setTargetColumn}
        />
      </div>
    </div>
  );
}
