import { CCol, CContainer, CRow } from "@coreui/react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { ColumnConfigurations } from "../src/store/datasets";

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
          <CCol>{column.name}</CCol>
        </CRow>
      ))}
    </CContainer>
  );
};

export default ColumnConfiguration;
