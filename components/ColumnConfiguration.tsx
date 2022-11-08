import { CCol, CContainer, CRow } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../src/store";

const ColumnConfiguration = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Column mapping</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          {state.datasets.columns && (
            <CCol>
              <pre style={{ maxHeight: "20rem" }}>
                {JSON.stringify(state.datasets.columns, null, 2)}
              </pre>
            </CCol>
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ColumnConfiguration;
