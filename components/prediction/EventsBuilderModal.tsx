import { useEffect, useState } from "react";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CButton,
  CFormRange,
  CCollapse,
  CCard,
  CCardBody,
  CForm,
  CFormTextarea,
} from "@coreui/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppSelector, useAppDispatch } from "../../src/hooks";
import { selectModelConfiguration } from "../../src/store/selectors";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import { editModelConfig } from "../../src/store/models";
import {
  eventNameSchema,
  eventDatesSchema,
  eventRegularization,
  eventLowerWindow,
  eventUpperWindow,
} from "../../src/schemas/modelParameters";
import { extractValidationStatus } from "../../src/schemas/helpers";
import { eventNames } from "process";

type eventValidationParameters = {
  eventName: string;
  eventDateRanges: string[];
  regularization: number;
};

const removeDate = (dateArray: string[], date: string) => {
  //removes specified date from dateArray and returns the new array
  const index = dateArray.indexOf(date);
  if (index > -1) {
    dateArray.splice(index, 1);
  }
  return dateArray;
};

const addDateRange = (
  dateRangeArray: string[],
  dateRange: [string, string]
) => {
  //concatenates both string entries of dateRange and adds them to dateRangeArray
  // both dates have to specified
  if (dateRange[0] === "" || dateRange[1] === "") {
    return dateRangeArray;
  }
  // check for invalid date
  if (dateRange[0] === "Invalid Date" || dateRange[1] === "Invalid Date") {
    return dateRangeArray;
  }
  const startDate = new Date(dateRange[0]);
  const endDate = new Date(dateRange[1]);
  // start date can't be after end date
  if (startDate > endDate) {
    return dateRangeArray;
  }
  const dateRangeString = dateRange[0] + "/" + dateRange[1];
  // check if dateRange is already in dateRangeArray, no duplicates allowed
  if (dateRangeArray.includes(dateRangeString)) {
    return dateRangeArray;
  }
  dateRangeArray.push(dateRangeString);
  return dateRangeArray;
};

const extractDatesListFromData = (
  dateRange: string,
  datasetTime: { [key: number]: string }
) => {
  // extracts all dates from a dateRange string
  const dataTimeArray = Object.values(datasetTime);
  const dates = dateRange.split("/");
  let datesList: string[] = [];
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);
  for (let i = 0; i < dataTimeArray.length; i++) {
    const date = new Date(dataTimeArray[i]);
    if (date >= startDate && date <= endDate) {
      datesList.push(dataTimeArray[i]);
    }
  }
  return datesList;
};

const extractDatesList = (dateRange: string) => {
  // extracts all dates from a dateRange string
  const dates = dateRange.split("/");
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);
  const datesList: string[] = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = dayjs(date).format("YYYY-MM-DD").toString();
    datesList.push(formattedDate);
  }
  return datesList;
};

const validateEventParameters = ({
  eventName,
  eventDateRanges,
  regularization,
}: eventValidationParameters) => {
  // validates event parameters and returns a validation status
  const validationStatus = {
    eventName: {
      valid: false,
      error: "",
    },
    eventDateRanges: {
      valid: false,
      error: "",
    },
    regularization: {
      valid: false,
      error: "",
    },
  };
  validationStatus.eventName = extractValidationStatus(
    eventNameSchema.safeParse(eventName)
  );
  validationStatus.eventDateRanges = extractValidationStatus(
    eventDatesSchema.safeParse(eventDateRanges)
  );
  validationStatus.regularization = extractValidationStatus(
    eventRegularization.safeParse(regularization)
  );
  return validationStatus;
};

const EventsBuilderModal = ({ visible, setVisible }: any) => {
  // Creates a modal for specifying event parameters name, window size, regularization, mode and dates
  const [eventName, setEventName] = useState<string>("");
  const [eventDateRanges, setEventDateRanges] = useState<string[]>([]);
  const [eventDateRange, setEventDateRange] = useState<[string, string]>([
    "",
    "",
  ]);
  const [showAdv, setShowAdv] = useState<boolean>(false);
  const [regularization, setRegularization] = useState<number>(0);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const predictionData = useAppSelector((state) => state.datasets.prediction);
  const dispatch = useAppDispatch();

  const clear = () => {
    setEventName("");
    setEventDateRange(["", ""]);
    setEventDateRanges([]);
  };

  const validationStatus = validateEventParameters({
    eventName,
    eventDateRanges,
    regularization,
  });

  const saveEvent = () => {
    // Saves event to modelConfiguration
    // convert dateRanges to dates
    const stringDates = eventDateRanges.reduce(
      (accumulator: string[], dateRange) => [
        ...accumulator,
        ...extractDatesListFromData(dateRange, predictionData?.forecast.ds),
      ],
      []
    );
    const newEvent = {
      dates: stringDates,
      regularization: 0,
      lowerWindow: 0,
      upperWindow: 0,
      mode: "additive",
    };
    dispatch(
      editModelConfig({
        events: { [eventName]: newEvent },
      })
    );
  };
  return (
    <CModal
      className="show d-block"
      backdrop={"static"}
      visible={visible}
      onClose={() => {
        clear();
        setVisible(false);
      }}
    >
      <CModalHeader>
        <CModalTitle>
          Add a one time or recurring event with all assoicated dates
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="events-builder-modal__body">
          <div className="events-builder-modal__body__event-settings">
            <h5>Event Settings</h5>
            <CFormInput
              type="text"
              size="sm"
              placeholder="Event name"
              onChange={(e) => setEventName(e.target.value)}
              valid={validationStatus.eventName.valid}
              invalid={!validationStatus.eventName.valid}
              feedbackValid=""
              feedbackInvalid={validationStatus.eventName.error}
            ></CFormInput>
            <CButton onClick={() => setShowAdv(!showAdv)}>
              {showAdv ? "Hide Advanced" : "Show Advanced"}
            </CButton>
            <CCollapse visible={showAdv}>
              <CCard className="mt-3">
                <CCardBody>
                  <CFormRange
                    min={0}
                    max={1}
                    step={0.01}
                    label={`Regularization ${regularization}`}
                    defaultValue={0}
                    onChange={(e) => setRegularization(Number(e.target.value))}
                  ></CFormRange>
                  <p>Event duration (days)</p>
                  <CFormInput
                    type="number"
                    size="sm"
                    placeholder="Event duration (days)"
                    defaultValue={1}
                  ></CFormInput>
                </CCardBody>
              </CCard>
            </CCollapse>
          </div>
          <div className="events-builder-moald__body__dates-box">
            <h5>Add Date</h5>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(new Date())}
                onChange={(date) =>
                  date !== null &&
                  setEventDateRange([
                    date.format("MM-DD-YYYY").toString(),
                    eventDateRange[1],
                  ])
                }
              ></DatePicker>
              <DatePicker
                maxDate={dayjs(new Date())}
                onChange={(date) =>
                  date !== null &&
                  setEventDateRange([
                    eventDateRange[0],
                    date.format("MM-DD-YYYY").toString(),
                  ])
                }
              ></DatePicker>
            </LocalizationProvider>
            <CButton
              onClick={() =>
                setEventDateRanges(
                  addDateRange([...eventDateRanges], eventDateRange)
                )
              }
            >
              Add Date Range
            </CButton>
            <div className="events-builder-modal__body__dates-list">
              {eventDateRanges.map((date, index) => {
                return (
                  <Chip
                    key={index}
                    label={date}
                    onDelete={() => {
                      const newDates = removeDate(
                        [...eventDateRanges],
                        eventDateRanges[index]
                      );
                      setEventDateRanges(newDates);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            clear();
            setVisible(false);
          }}
        >
          Close
        </CButton>
        <CButton
          color="primary"
          onClick={() => {
            // check that inputs are valid and event doesn't already exist
            // TODO: add error popups
            if (
              validationStatus.eventName.valid &&
              validationStatus.eventDateRanges.valid &&
              validationStatus.regularization.valid &&
              modelConfiguration.events[eventName] === undefined
            ) {
              saveEvent();
              setVisible(false);
            }
          }}
        >
          Save Changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EventsBuilderModal;
