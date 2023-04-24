import { CButton, CCol, CListGroupItem, CRow } from "@coreui/react";
import { HistoricModel } from "../../src/store/history";

export type HistoryListItemProps = {
  model: HistoricModel;
  index: number;
  removeSelf: () => void;
};

type Metrics = {
  [key: string]: number;
};

const getLatestMetrics = (metrics: any) =>
  Object.keys(metrics).reduce((obj: Metrics, key: keyof Metrics) => {
    const metric = Object.values(metrics[key]);
    obj[key] = metric.slice(-1)[0] as number;
    return obj;
  }, {});

const displayMetrics = (metrics: any) => {
  const latestMetrics = getLatestMetrics(metrics);
  return Object.keys(latestMetrics)
    .filter((key) => key !== "epoch")
    .map((key) => (
      <span key={key} className="mx-1">
        {key}: {latestMetrics[key].toFixed(2)}
      </span>
    ));
};

export const HistoryListItem = (props: HistoryListItemProps) => {
  return (
    <CListGroupItem key={props.index}>
      <CRow>
        <CCol sm={3}>{props.index}</CCol>
        <CCol>Metrics: {displayMetrics(props.model.metrics)}</CCol>
        <CCol>
          <CButton color="danger" onClick={props.removeSelf}>
            Delete
          </CButton>
        </CCol>
      </CRow>
    </CListGroupItem>
  );
};
