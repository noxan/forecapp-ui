import { useRouter } from "next/router";
import { selectHistoricModels } from "../src/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { CContainer, CListGroup, CListGroupItem } from "@coreui/react";
import { HistoryListItem } from "../components/history/HistoryListItem";
import { removeModel } from "../src/store/history";

export default function History() {
  const router = useRouter();
  const dispatch = useDispatch();
  const historicModels = useSelector(selectHistoricModels);

  return (
    <CContainer fluid>
      <CListGroup>
        {historicModels.models.map((model, index) => (
          <HistoryListItem
            key={index}
            index={index}
            model={model}
            removeSelf={() => dispatch(removeModel(index))}
          />
        ))}
      </CListGroup>
    </CContainer>
  );
}
