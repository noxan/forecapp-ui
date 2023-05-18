import { numHistoricModels } from "../../src/store/selectors";
import { CListGroup } from "@coreui/react";
import { HistoryListItem } from "./HistoryListItem";
import { useAppSelector } from "../../src/hooks";

export type VersionHistoryProps = {
  closeSelf: () => void;
};

export default function VersionHistory(props: VersionHistoryProps) {
  const numModels = useAppSelector(numHistoricModels);

  const itemList = [];
  for (let i = 0; i < numModels; i++) {
    itemList.push(
      <HistoryListItem index={i} key={i} onClick={props.closeSelf} />
    );
  }

  return <CListGroup className="version-history">{itemList}</CListGroup>;
}
