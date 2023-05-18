import { CProgress, CProgressBar, CSpinner } from "@coreui/react";

const LoadingOverlay = ({
  progressBar,
  progress,
}: {
  progressBar: boolean;
  progress: number;
}): JSX.Element => (
  <div
    style={{
      transform: "translate(-50%, -50%)",
      position: "absolute",
      left: "50%",
      top: "50%",
      zIndex: 100,
      display: "block",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      width: "100%",
      height: "100%",
    }}
  >
    {progressBar ? (
      <CProgress className="mb-3">
        <CProgressBar value={progress} />
      </CProgress>
    ) : (
      <CSpinner color="primary" />
    )}
    <p>Generating your forecast...</p>
  </div>
);

export default LoadingOverlay;
