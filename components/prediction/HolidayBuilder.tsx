import { CBadge, CFormSelect } from "@coreui/react";
import { countryHolidays } from "../../src/holidays";

const HolidayBuilder = ({ modelConfiguration, updateConfig }: any) => (
  <>
    <div>
      {modelConfiguration?.holidays?.map(
        (code: keyof typeof countryHolidays) => (
          <CBadge
            key={code}
            color="secondary"
            style={{ marginRight: "0.25rem" }}
            onClick={() =>
              updateConfig({
                holidays: (modelConfiguration?.holidays || []).filter(
                  (item: string) => item !== code
                ),
              })
            }
          >
            {countryHolidays[code]}
          </CBadge>
        )
      )}
    </div>
    <CFormSelect
      className="mt-2"
      onChange={async (evt) => {
        const value = evt.target.value;
        if (value !== "Add country holidays") {
          if (!modelConfiguration?.holidays?.includes(value)) {
            await updateConfig({
              holidays: [value, ...(modelConfiguration?.holidays || [])],
            });
          }
          evt.target.value = "Add country holidays";
        }
      }}
    >
      <option>Add country holidays</option>
      {Object.entries(countryHolidays).map(([code, country]) => (
        <option key={code} value={code}>
          {country}
        </option>
      ))}
    </CFormSelect>
  </>
);

export default HolidayBuilder;
