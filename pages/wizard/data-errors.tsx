import { useState } from "react";
import { useAppSelector } from "../../src/hooks";
import { selectDataErrors } from "../../src/store/selectors";
import { CCol, CListGroup, CListGroupItem, CRow, CBadge } from "@coreui/react";
import LinkButton from "../../components/LinkButton";
import { errorLevelColor } from "../../src/store/datasets";

export default function DataErrorPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const dataErrors = useAppSelector(selectDataErrors);
  const [hasErrors, setHasErrors] = useState(false);

  return (
    <main>
      <CRow>
        <CListGroup>
          {dataErrors.map((e, ind) => {
            return (
              <CListGroupItem key={ind} color={errorLevelColor(e.level)}>
                {e.message}
              </CListGroupItem>
            );
          })}
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
