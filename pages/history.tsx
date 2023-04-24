import { selectNumHistoricModels } from "../src/store/selectors";
import { CContainer, CListGroup } from "@coreui/react";
import { HistoryListItem } from "../components/history/HistoryListItem";
import { useAppSelector } from "../src/hooks";

export default function History() {
  const numModels = useAppSelector(selectNumHistoricModels);

  const itemList = [];
  for (let i = 0; i < numModels; i++) {
    itemList.push(<HistoryListItem index={i} key={i} />);
  }

  return (
    <CContainer fluid>
      <CListGroup>{itemList}</CListGroup>
    </CContainer>
  );
}
