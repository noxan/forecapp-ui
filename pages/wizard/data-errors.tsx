import { useMemo, useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectDataErrors } from "../../src/store/selectors";
import {
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CBadge,
  CContainer,
} from "@coreui/react";
import LinkButton from "../../components/LinkButton";
import { DataError, ErrorLevel } from "../../src/store/datasets";

const errorLevelColor: Record<ErrorLevel, string> = {
  Error: "danger",
  Info: "info",
  Warning: "warning",
};

export default function DataErrorPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const dataErrors = useAppSelector(selectDataErrors);
  const [hasErrors, setHasErrors] = useState(false);

  const groupErrors = () => {
    const groupedErrors: { [key: string]: DataError[] } = {};
    for (let i = 0; i < dataErrors.length; i++) {
      (groupedErrors[dataErrors[i].type] ||= []).push(dataErrors[i]);
    }
    return groupedErrors;
  };

  const groupedErrors = useMemo(groupErrors, [dataErrors]);
  useMemo(
    () => setHasErrors(dataErrors.some((e) => e.level === "Error")),
    [dataErrors]
  );

  return (
    <main>
      <CContainer className="mt-5">
        <CRow>
          <CListGroup>
            {groupedErrors["Validation"] &&
              groupedErrors["Validation"].map((e, ind) => (
                <CListGroupItem
                  key={ind}
                  color={errorLevelColor[e.level]}
                  className="d-flex justify-content-between align-items-center"
                >
                  {e.message}
                </CListGroupItem>
              ))}
            {["Quotes", "Delimiter", "FieldMismatch"].map(
              (type, ind) =>
                groupedErrors[type] && (
                  <CListGroupItem
                    key={type}
                    color={errorLevelColor[groupedErrors[type][0].level]}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {groupedErrors[type][0].level}: {type}
                    <CBadge
                      shape="rounded-pill"
                      color={errorLevelColor[groupedErrors[type][0].level]}
                    >
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
              href="/wizard/pick-time"
            >
              Confirm
            </LinkButton>
            <LinkButton
              color="primary"
              variant="ghost"
              href="/"
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
