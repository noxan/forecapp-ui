import { CButton, CCol, CContainer, CFormSelect, CRow } from "@coreui/react";
import { capitalize } from "../src/helpers";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import {
  ColumnConfigurations,
  ColumnFunctionalities,
  columnFunctionalities,
  resetColumns,
  updateColumnFunction,
} from "../src/store/datasets";

const ColumnConfiguration = () => {
  const columns = useAppSelector(
    (state) => state.datasets.columns
  ) as ColumnConfigurations;
  const dispatch = useAppDispatch();

  return (
    <CContainer>
      <CRow className="my-2">
        <CCol>
          <h1>Column mapping</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton onClick={() => dispatch(resetColumns())}>
            Init/reset columns (click this after loading dataset or to reset)
          </CButton>
        </CCol>
      </CRow>
      {columns && (
        <CRow md={{ cols: 3 }}>
          {Object.values(columns).map((column, index) => (
            <CCol key={column.identifier} title={column.identifier}>
              {column.name}
              {/* TODO: make sure special columns (time, value) can only be picked once */}
              <CFormSelect
                defaultValue={column.functionality}
                onChange={(evt) =>
                  dispatch(
                    updateColumnFunction({
                      identifier: column.identifier,
                      value:
                        evt.target.value === "None"
                          ? undefined
                          : (evt.target.value as ColumnFunctionalities),
                    })
                  )
                }
              >
                {columnFunctionalities.map((functionality) => (
                  <option key={functionality || "None"} value={functionality}>
                    {functionality ? capitalize(functionality) : "None"}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          ))}
        </CRow>
      )}
    </CContainer>
  );
};

export default ColumnConfiguration;
