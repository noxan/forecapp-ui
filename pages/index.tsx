import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { importDataset } from "../src/store/datasets";
import Layout from "../components/Layout";

const datasets = [
  "datasets/energy_dataset_small.csv",
  "datasets/air_passengers.csv",
];

export default function Welcome() {
  // const count = useSelector((state: any) => state.datasets);
  const dispatch = useDispatch();
  return (
    <Layout>
      <CContainer>
        {datasets.map((dataset) => (
          <CRow key={dataset} className="my-2">
            <CCol>
              <CButton onClick={() => dispatch(importDataset(dataset))}>
                Load {dataset}
              </CButton>
            </CCol>
          </CRow>
        ))}
      </CContainer>
    </Layout>
  );
}
