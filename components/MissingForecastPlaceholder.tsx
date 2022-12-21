import { CSpinner } from "@coreui/react";

const MissingForecastPlaceholder = () => (
  <div
    style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CSpinner color="primary" />
    <p className="pt-2">Generating your first forecast...</p>
  </div>
);

export default MissingForecastPlaceholder;
