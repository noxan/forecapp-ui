import { useState } from "react";
import DatasetTablePreview from "./DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "./DatasetExplorer/DatasetVisualize";
import DatasetColumns from "./DatasetExplorer/DatasetColumns";
import DataSelector from "./DataSelector";
import DatasetTable from "./DatasetExplorer/DatasetTable";
import DataUpload from "./home/DataUpload";
import SampleData from "./home/SampleData";

export type DataSelectorPages =
  | "data-upload"
  | "data-selector"
  | "data-viewer"
  | "data-visualize"
  | "data-table";

export default function DataSelectorPage(props: {
  selectedSubPage: DataSelectorPages;
  onDataUpload: () => void;
}) {
  const switchSubPage = (subPage: DataSelectorPages) => {
    switch (subPage) {
      case "data-upload":
        return <DataUpload onDataUpload={props.onDataUpload} />;
      case "data-selector":
        return <DataSelector />;
      case "data-selector":
        return <DataSelector />;
      case "data-viewer":
        return <DatasetColumns />;
      case "data-visualize":
        return <DatasetVisualize showLegend={true} />;
      case "data-table":
        return <DatasetTable />;
      default:
        return <DataSelector />;
    }
  };
  return switchSubPage(props.selectedSubPage);
}
