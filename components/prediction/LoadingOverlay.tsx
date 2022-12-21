import { CSpinner } from "@coreui/react";

const LoadingOverlay = () => (
  <div
    style={{
      transform: "translate(-50%, -50%)",
      position: "fixed",
      left: "50%",
      top: "50%",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      width: "100%",
      height: "100%",
    }}
  >
    <CSpinner color="primary" />
    <p>Refreshing your chart...</p>
  </div>
);

export default LoadingOverlay;
