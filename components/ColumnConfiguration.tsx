import { CCol, CContainer, CFormSelect, CRow } from "@coreui/react";
import { capitalize } from "../src/helpers";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import {
  ColumnConfigurations,
  columnFunctionalities,
} from "../src/store/datasets";

const ColumnConfiguration = () => {
  const columns = useAppSelector(
    (state) => state.datasets.columns
  ) as ColumnConfigurations;
  const dispatch = useAppDispatch();

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Column mapping</h1>
        </CCol>
      </CRow>
      {Object.values(columns).map((column) => (
        <CRow key={column.identifier}>
          <CCol>
            {column.name} ({column.identifier})
            {/* TODO: make sure special columns (time, value) can only be picked once */}
            <CFormSelect
              defaultValue={column.functionality}
              onChange={(evt) =>
                console.log("changeColumnFunction", evt.target.value)
              }
            >
              {columnFunctionalities.map((functionality) => (
                <option key={functionality || "None"} value={functionality}>
                  {functionality ? capitalize(functionality) : "None"}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
      ))}
    </CContainer>
  );
};

export default ColumnConfiguration;
