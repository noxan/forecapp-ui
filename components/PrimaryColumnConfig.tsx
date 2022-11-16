import { CFormSelect } from "@coreui/react";
import { SELECT_STATE_NONE } from "../src/definitions";
import { capitalize } from "../src/helpers";
import { useAppDispatch } from "../src/hooks";

const PrimaryColumnConfig = ({
  columns,
  label,
  defaultValue,
  setAction,
}: {
  columns: string[];
  label: string;
  defaultValue: string;
  setAction: Function;
}) => {
  const dispatch = useAppDispatch();
  return (
    <CFormSelect
      label={`${capitalize(label)} column`}
      defaultValue={defaultValue}
      onChange={(e) => dispatch(setAction(e.target.value))}
      options={[
        {
          label: `Select primary ${label} column`,
          value: SELECT_STATE_NONE,
        },
        ...columns.map((column) => ({
          label: capitalize(column),
          value: column,
        })),
      ]}
    />
  );
};
export default PrimaryColumnConfig;
