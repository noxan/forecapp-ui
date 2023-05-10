import { CButton, CCallout, CCol, CListGroupItem, CRow } from "@coreui/react";
import {
  selectNthHistoricModel,
  currentModel,
} from "../../src/store/selectors";
import { useAppSelector } from "../../src/hooks";
import { useDispatch } from "react-redux";
import { removeModel, selectModel } from "../../src/store/history";
import { setModelConfig } from "../../src/store/models";
import { useRouter } from "next/router";

export type HistoryListItemProps = {
  index: number;
  onClick: () => void;
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
  const router = useRouter();
  const dispatch = useDispatch();
  const model = useAppSelector(selectNthHistoricModel)(props.index);
  const active = props.index === useAppSelector(currentModel);
  return (
    <CListGroupItem key={props.index}>
      <CRow>
        <CCol sm={3}>{new Date(model.time).toUTCString()}</CCol>
        <CCol>Metrics: {displayMetrics(model.metrics)}</CCol>
        <CCol>
          <CButton
            color="danger"
            onClick={() => dispatch(removeModel(props.index))}
          >
            Delete
          </CButton>
        </CCol>
        <CCol>
          <CButton
            color="primary"
            onClick={() => {
              dispatch(selectModel(props.index));
              dispatch(setModelConfig(model.modelConfig));
              props.onClick();
            }}
          >
            Apply
          </CButton>
        </CCol>
      </CRow>
    </CListGroupItem>
  );
};
