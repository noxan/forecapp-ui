import { CSpinner } from "@coreui/react";

const LoadingOverlay = (props: { msg: string }) => (
  <div
    style={{
      position: "absolute",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      height: "100vh",
    }}
  >
    <CSpinner color="primary" />
    <p>{props.msg}</p>
  </div>
);

export default LoadingOverlay;
