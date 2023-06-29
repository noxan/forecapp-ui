import { useMemo } from "react";
import DataUpload from "./DataUpload";
import SampleData from "./SampleData";
export type HomeViewMode = "Data Upload" | "Sample Data";

function viewRender(view: HomeViewMode) {
  switch (view) {
    case "Data Upload":
      return <DataUpload />;
    case "Sample Data":
      return <SampleData />;
  }
}

export default function Home(props: { view: HomeViewMode }) {
  const viewComponent = useMemo(() => viewRender(props.view), [props.view]);
  return viewComponent;
}
