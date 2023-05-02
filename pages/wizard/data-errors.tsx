import { useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectDataErrors } from "../../src/store/selectors";
import { CCol, CListGroup, CListGroupItem, CRow, CBadge } from "@coreui/react";
import LinkButton from "../../components/LinkButton";
import { DataError, errorLevelColor } from "../../src/store/datasets";

export default function DataErrorPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const dataErrors = useAppSelector(selectDataErrors);
  const [hasErrors, setHasErrors] = useState(false);

  const groupErrors = (errors: DataError[]) => {
    const groupedErrors: { [key: string]: DataError[] } = {};
    for (let i = 0; i < errors.length; i++) {
      (groupedErrors[errors[i].type] ||= []).push(errors[i]);
    }
    return groupedErrors;
  };

  const groupedErrors = groupErrors(dataErrors);

  return (
    <main>
      <CRow>
        <CListGroup>
          {groupedErrors["Validation"] &&
            groupedErrors["Validation"].map((e, ind) => (
              <CListGroupItem key={ind}>{e.message}</CListGroupItem>
            ))}
          {["Quotes", "Delimiter", "FieldMismatch"].map(
            (type, ind) =>
              groupedErrors[type] && (
                <CListGroupItem
                  key={type}
                  color="danger"
                  className="d-flex justify-content-between align-items-center"
                >
                  {type}
                  <CBadge shape="rounded-pill" color="danger">
                    {groupedErrors[type].length}
                  </CBadge>
                </CListGroupItem>
              )
          )}
        </CListGroup>
      </CRow>
      <CRow className="my-2">
        <CCol>
          <LinkButton
            color="primary"
            disabled={hasErrors}
            href="/prediction?first-run"
          >
            Confirm
          </LinkButton>
          <LinkButton
            color="primary"
            variant="ghost"
            href="/wizard/pick-target"
            className="mx-2"
          >
            Back
          </LinkButton>
        </CCol>
      </CRow>
    </main>
  );
}
