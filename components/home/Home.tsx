import { useMemo } from "react";
import DataUpload from "./DataUpload";
import SampleData from "./SampleData";
export type HomeViewMode = "Data Upload" | "Sample Data";

function viewRender(view: HomeViewMode, onDataUpload: () => void) {
  switch (view) {
    case "Data Upload":
      return <DataUpload onDataUpload={onDataUpload} />;
    case "Sample Data":
      return <SampleData onDataUpload={onDataUpload} />;
  }
}

export default function Home(props: {
  view: HomeViewMode;
  onDataUpload: () => void;
}) {
  const viewComponent = useMemo(
    () => viewRender(props.view, props.onDataUpload),
    [props.view, props.onDataUpload]
  );
  return viewComponent;
}
