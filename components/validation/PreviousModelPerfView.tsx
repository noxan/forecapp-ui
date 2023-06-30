import {
  CButton,
  CCol,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCaretBottom } from "@coreui/icons";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import {
  numHistoricModels,
  selectHistoricModels,
  selectNthHistoricModel,
} from "../../src/store/selectors";
import { useEffect, useState } from "react";
import {
  HistoricModel,
  getLatestTestLoss,
  getLatestTrainMAE,
  selectModel,
} from "../../src/store/history";
import { applyPrevModel } from "../../src/store/models";

type Header = "Time" | "Test Loss" | "Train MAE";

function array1ToN(n: number) {
  const arr = Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
}

function sortBy(previousModelArr: HistoricModel[], sortHeader: Header) {
  const arr = array1ToN(previousModelArr.length);
  let cmpFn: (a: number, b: number) => number = (a, b) =>
    previousModelArr[a].time - previousModelArr[b].time;
  switch (sortHeader) {
    case "Time":
      cmpFn = (a, b) => previousModelArr[a].time - previousModelArr[b].time;
      break;
    case "Train MAE":
      cmpFn = (a, b) =>
        getLatestTrainMAE(previousModelArr[a]) -
        getLatestTrainMAE(previousModelArr[b]);
      break;
    case "Test Loss":
      cmpFn = (a, b) =>
        getLatestTestLoss(previousModelArr[a]) -
        getLatestTestLoss(previousModelArr[b]);
      break;
    default:
      break;
  }
  return arr.sort(cmpFn);
}

export default function PreviousModelPerfView() {
  const dispatch = useAppDispatch();
  const previousModels = useAppSelector(selectHistoricModels);
  const [sortedModels, setSortedModels] = useState<number[]>(
    array1ToN(previousModels.models.length)
  );
  const [activeHeader, setActiveHeader] = useState<Header>("Time");

  return (
    <CContainer fluid>
      <CCol>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell
                scope="col"
                onClick={() => {
                  setSortedModels(sortBy(previousModels.models, "Time"));
                  setActiveHeader("Time");
                }}
              >
                Time Created
                {activeHeader === "Time" && (
                  <CIcon icon={cilCaretBottom} size="sm" />
                )}
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                onClick={() => {
                  setSortedModels(sortBy(previousModels.models, "Test Loss"));
                  setActiveHeader("Test Loss");
                }}
              >
                Test Loss
                {activeHeader === "Test Loss" && (
                  <CIcon icon={cilCaretBottom} size="sm" />
                )}
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                onClick={() => {
                  setSortedModels(sortBy(previousModels.models, "Train MAE"));
                  setActiveHeader("Train MAE");
                }}
              >
                Train MAE
                {activeHeader === "Train MAE" && (
                  <CIcon icon={cilCaretBottom} size="sm" />
                )}
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {sortedModels.map((modelInd, index) => {
              const model = previousModels.models[modelInd];
              return (
                <CTableRow
                  key={modelInd}
                  active={previousModels.currentModel === index}
                >
                  <CTableHeaderCell scope="row">
                    {new Date(model.time).toUTCString()}
                  </CTableHeaderCell>
                  <CTableDataCell>{getLatestTestLoss(model)}</CTableDataCell>
                  <CTableDataCell>{getLatestTrainMAE(model)}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        dispatch(selectModel(modelInd));
                        dispatch(applyPrevModel(model));
                      }}
                    >
                      Apply model
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
      </CCol>
    </CContainer>
  );
}
