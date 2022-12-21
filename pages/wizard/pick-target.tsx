import { CCol, CContainer, CRow } from "@coreui/react";
import LinkButton from "../../components/LinkButton";
import MissingDatasetPlaceholder from "../../components/MissingDatasetPlaceholder";
import PrimaryColumnConfig from "../../components/PrimaryColumnConfig";
import { isColumnValid } from "../../src/definitions";
import { useAppSelector } from "../../src/hooks";
import { setTargetColumn } from "../../src/store/datasets";
import { selectDataset, selectTargetColumn } from "../../src/store/selectors";

export default function WizardTimeColumnPage() {
  const targetColumn = useAppSelector(selectTargetColumn);
  const dataset = useAppSelector(selectDataset);

  const isValid = isColumnValid(targetColumn);

  if (!dataset) {
    return <MissingDatasetPlaceholder />;
  }

  const columns = Object.keys(dataset[0]);

  return (
    <main>
      <CContainer className="mt-5">
        <CRow className="my-2">
          <CCol>
            <h2>Pick the column for which you wish to create a prediction.</h2>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <p>
              Info: The model needs to know which value you wish to predict,
              often also called target column and labeled with the character y
              in many more scientific contexts.
              <br />
              Depending on your dataset a common pick might be “price”,
              “demand”, “sales”, “visitors”, “inventory”, ...
            </p>
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <PrimaryColumnConfig
              columns={columns}
              label="prediction"
              defaultValue={targetColumn}
              setAction={setTargetColumn}
            />
          </CCol>
        </CRow>
        <CRow className="my-2">
          <CCol>
            <LinkButton color="primary" disabled={!isValid} href="/prediction">
              Confirm
            </LinkButton>
            <LinkButton
              color="primary"
              variant="ghost"
              href="/wizard/pick-time"
              className="mx-2"
            >
              Back
            </LinkButton>
          </CCol>
        </CRow>
      </CContainer>
    </main>
  );
}
