import { CButton, CCol, CListGroupItem, CRow } from "@coreui/react";
import {
  selectModelConfiguration,
  selectNthHistoricModel,
} from "../../src/store/selectors";
import { useAppSelector } from "../../src/hooks";
import { useDispatch } from "react-redux";
import { removeModel } from "../../src/store/history";
import { setModelConfig } from "../../src/store/models";
import { useRouter } from "next/router";

export type HistoryListItemProps = {
  index: number;
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
  const modelConfig = useAppSelector(selectModelConfiguration);
  return (
    <CListGroupItem key={props.index}>
      <CRow>
        <CCol sm={3}>{props.index}</CCol>
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
              dispatch(setModelConfig(model.modelConfig));
              router.back();
            }}
          >
            Apply
          </CButton>
        </CCol>
      </CRow>
    </CListGroupItem>
  );
};
