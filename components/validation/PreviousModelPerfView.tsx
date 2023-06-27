import {
  CCol,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useAppSelector } from "../../src/hooks";
import {
  numHistoricModels,
  selectHistoricModels,
  selectNthHistoricModel,
} from "../../src/store/selectors";
import { useEffect, useState } from "react";
import { HistoricModel } from "../../src/store/history";

function array1ToN(n: number) {
  const arr = Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
}

export default function PreviousModelPerfView() {
  const previousModels = useAppSelector(selectHistoricModels);
  const [sortedModels, setSortedModels] = useState<number[]>(
    array1ToN(previousModels.models.length)
  );

  return (
    <CContainer fluid>
      <CCol>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Time Created</CTableHeaderCell>
              <CTableHeaderCell scope="col">Test Loss</CTableHeaderCell>
              <CTableHeaderCell scope="col">Train MAE</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {sortedModels.map((modelIndex, index) => {
              const model = previousModels.models[modelIndex];
              const testMetricArr = model.testMetrics
                ? Object.values(model.testMetrics.Loss_test)
                : [];
              const trainMAEArr = Object.values(model.metrics.MAE) as number[];
              return (
                <CTableRow
                  key={modelIndex}
                  active={previousModels.currentModel === index}
                >
                  <CTableHeaderCell scope="row">
                    {new Date(model.time).toUTCString()}
                  </CTableHeaderCell>
                  <CTableDataCell>
                    {testMetricArr[testMetricArr.length - 1]}
                  </CTableDataCell>
                  <CTableDataCell>
                    {trainMAEArr[trainMAEArr.length - 1]}
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
