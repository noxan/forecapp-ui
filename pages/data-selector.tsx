import { useState } from "react";
import DatasetTablePreview from "../components/DatasetExplorer/DatasetTablePreview";
import DatasetVisualize from "../components/DatasetExplorer/DatasetVisualize";
import DatasetColumns from "../components/DatasetExplorer/DatasetColumns";
import DataSelector from "../components/DataSelector";
import DatasetTable from "../components/DatasetExplorer/DatasetTable";

export default function DataSelectorPage({
  selectedSubPage = "data-selector",
}: {
  selectedSubPage: string;
}) {
  const switchSubPage = (subPage: string) => {
    switch (subPage) {
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
  return (
    <div className="row">
      <div className="col-12 justify-content-start">
        {switchSubPage(selectedSubPage)}
      </div>
    </div>
  );
}
