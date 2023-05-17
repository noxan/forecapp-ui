import { use, useEffect, useMemo, useState } from "react";
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
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";
import {
  DateTimeValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateTimeField } from "@mui/x-date-pickers";
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
import {
  dateTimeFormatStrings,
  timeResolution,
  msTimeDurations,
  timeUnits,
} from "../../src/timeResolution";
import { setStartEndDates } from "../../src/helpers";

type eventValidationParameters = {
  eventName: string;
  eventDateRanges: string[];
  regularization: number;
  window: [number, number];
};

type repeatOptionsType = timeResolution | "unique";

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

const computeRepeatOptions = (
  startDate: Date,
  endDate: Date,
  timeResolution: timeResolution
) => {
  // checks event duration and timeResolution to compute repeat options
  const duration = endDate.getTime() - startDate.getTime();
  const largestRepeatUnit = timeUnits.find(
    (unit) => duration / msTimeDurations[unit] >= 2
  );
  const repeatOptions =
    largestRepeatUnit !== undefined
      ? timeUnits.filter(
          (unit) => msTimeDurations[unit] <= msTimeDurations[largestRepeatUnit]
        )
      : timeUnits;
  // further filter repeatOptions based on timeResolution
  const repeatOptionsFiltered = repeatOptions.filter(
    (option) => msTimeDurations[option] >= msTimeDurations[timeResolution]
  );
  const finalRepeatOptions: repeatOptionsType[] = [
    "unique",
    ...repeatOptionsFiltered,
  ];
  return finalRepeatOptions;
};

const repeatEvent = (
  dateRange: [string, string],
  repeatOption: repeatOptionsType,
  datasetTimeRange: [string, string],
  dateTimeFormat: string,
  timeResolution: timeResolution
) => {
  // repeats event based on repeatOption and then calls extractDatesListFromData to extract dates from datasetTime
  // const dates = dateRange.split("/");
  const { startDate, endDate } = setStartEndDates(
    dayjs(dateRange[0], dateTimeFormat).toDate().toString(),
    dayjs(dateRange[1], dateTimeFormat).toDate().toString(),
    timeResolution
  );
  const datasetStartDate = new Date(datasetTimeRange[0]);
  const datasetEndDate = new Date(datasetTimeRange[1]);
  let dateRangesList = addDateRange([], [dateRange[0], dateRange[1]]);
  let repeatUnit: number;
  if (repeatOption === "unique") {
    return dateRangesList;
  } else {
    repeatUnit = msTimeDurations[repeatOption];
  }
  // check whether event duration is shorter than repeat time unit
  if (endDate.getTime() - startDate.getTime() > repeatUnit) {
    return dateRangesList;
  }
  // compute how many times the event can be repeated using repeatUnit
  const repeatCount = Math.floor(
    (datasetEndDate.getTime() - endDate.getTime()) / repeatUnit
  );
  // repeat event
  for (let i = 1; i <= repeatCount; i++) {
    const newStartDate = dayjs(
      new Date(startDate.getTime() + repeatUnit * i)
    ).format(dateTimeFormat);
    const newEndDate = dayjs(
      new Date(endDate.getTime() + repeatUnit * i)
    ).format(dateTimeFormat);
    dateRangesList = addDateRange(dateRangesList, [newStartDate, newEndDate]);
  }
  return dateRangesList;
};

const extractDatesListFromData = (
  dateRange: string,
  datasetTime: { [key: number]: string },
  timeResolution: timeResolution,
  dateTimeFormat: string
) => {
  // extracts all dates from a dateRange string
  const dataTimeArray = Object.values(datasetTime);
  const dates = dateRange.split("/");
  let datesList: string[] = [];
  const { startDate, endDate } = setStartEndDates(
    dayjs(dates[0], dateTimeFormat).toDate().toString(),
    dayjs(dates[1], dateTimeFormat).toDate().toString(),
    timeResolution
  );
  for (let i = 0; i < dataTimeArray.length; i++) {
    const date = new Date(dataTimeArray[i]);
    if (date >= startDate && date <= endDate) {
      datesList.push(dataTimeArray[i]);
    }
  }
  return datesList;
};

const validateEventParameters = ({
  eventName,
  eventDateRanges,
  regularization,
  window,
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
    lowerWindow: {
      valid: false,
      error: "",
    },
    upperWindow: {
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
  validationStatus.lowerWindow = extractValidationStatus(
    eventLowerWindow.safeParse(window[0])
  );
  validationStatus.upperWindow = extractValidationStatus(
    eventUpperWindow.safeParse(window[1])
  );
  return validationStatus;
};

const EventsBuilderModal = ({
  visible,
  setVisible,
  timeResolution,
  datasetTimeRange,
}: {
  visible: boolean;
  setVisible: any;
  timeResolution: timeResolution;
  datasetTimeRange: [string, string];
}) => {
  // Creates a modal for specifying event parameters name, window size, regularization, mode and dates
  const [eventName, setEventName] = useState<string>("");
  const [eventDateRanges, setEventDateRanges] = useState<string[]>([]);
  const [eventDateRange, setEventDateRange] = useState<[string, string]>([
    "",
    "",
  ]);
  const [showAdv, setShowAdv] = useState<boolean>(false);
  const [regularization, setRegularization] = useState<number>(0);
  const [window, setWindow] = useState<[number, number]>([0, 0]);
  const modelConfiguration = useAppSelector(selectModelConfiguration);
  const predictionData = useAppSelector((state) => state.datasets.prediction);
  const [startDateFieldError, setStartDateFieldError] =
    useState<DateTimeValidationError | null>(null);
  const [endDateFieldError, setEndDateFieldError] =
    useState<DateTimeValidationError | null>(null);
  const [repeatOptions, setRepeatOptions] = useState<repeatOptionsType[]>([
    "unique",
  ]);
  const [selectedRepeatOption, setSelectedRepeatOption] =
    useState<repeatOptionsType>("unique");
  const dispatch = useAppDispatch();

  const clear = () => {
    setEventName("");
    setEventDateRange(["", ""]);
    setEventDateRanges([]);
    setRegularization(0);
    setWindow([0, 0]);
  };

  useEffect(() => {
    setRepeatOptions(
      computeRepeatOptions(
        new Date(datasetTimeRange[0]),
        new Date(datasetTimeRange[1]),
        timeResolution
      )
    );
  }, [datasetTimeRange, timeResolution]);

  const startDateFieldErrorHandler = useMemo(() => {
    switch (startDateFieldError) {
      case "maxDate":
        return "Date is after the end date of the dataset";
      case "minDate":
        return "Date is before the start date of the dataset";
      case "maxTime":
        return "Date is after the end date of the dataset";
      case "minTime":
        return "Date is before the start date of the dataset";
      case "invalidDate":
        return "Date is invalid";
      default:
        return "";
    }
  }, [startDateFieldError]);

  const endDateFieldErrorHandler = useMemo(() => {
    switch (endDateFieldError) {
      case "maxDate":
        return "Date is after the end date of the dataset";
      case "minDate":
        return "Date is before the start date of the dataset";
      case "maxTime":
        return "Date is after the end date of the dataset";
      case "minTime":
        return "Date is before the start date of the dataset";
      case "invalidDate":
        return "Date is invalid";
      default:
        return "";
    }
  }, [endDateFieldError]);

  const validationStatus = validateEventParameters({
    eventName,
    eventDateRanges,
    regularization,
    window,
  });

  const saveEvent = () => {
    // Saves event to modelConfiguration
    // convert dateRanges to dates
    const stringDates = eventDateRanges.reduce(
      (accumulator: string[], dateRange) => [
        ...accumulator,
        ...extractDatesListFromData(
          dateRange,
          predictionData?.forecast.ds,
          timeResolution,
          dateTimeFormatStrings[timeResolution]
        ),
      ],
      []
    );
    const newEvent = {
      dates: stringDates,
      regularization: regularization,
      lowerWindow: window[0],
      upperWindow: window[1],
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
      scrollable
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
                  <p>Window Start {timeResolution}</p>
                  <CFormInput
                    type="number"
                    size="sm"
                    placeholder={`Window start ${timeResolution}`}
                    defaultValue={0}
                    onChange={(e) => {
                      setWindow([Number(e.target.value), window[1]]);
                    }}
                    valid={validationStatus.lowerWindow.valid}
                    invalid={!validationStatus.lowerWindow.valid}
                    feedbackValid=""
                    feedbackInvalid={validationStatus.lowerWindow.error}
                  ></CFormInput>
                  <p>Window End {timeResolution}</p>
                  <CFormInput
                    type="number"
                    size="sm"
                    placeholder={`Window end ${timeResolution}`}
                    defaultValue={0}
                    onChange={(e) => {
                      setWindow([window[0], Number(e.target.value)]);
                    }}
                    valid={validationStatus.upperWindow.valid}
                    invalid={!validationStatus.upperWindow.valid}
                    feedbackValid=""
                    feedbackInvalid={validationStatus.upperWindow.error}
                  ></CFormInput>
                </CCardBody>
              </CCard>
            </CCollapse>
          </div>
          <div className="events-builder-modal__body__dates-box">
            <h5>Add Date</h5>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimeField
                onChange={(date) =>
                  date !== null
                    ? setEventDateRange([
                        date
                          .format(dateTimeFormatStrings[timeResolution])
                          .toString(),
                        eventDateRange[1],
                      ])
                    : setEventDateRange(["", eventDateRange[1]])
                }
                maxDateTime={
                  eventDateRange[1] === ""
                    ? dayjs(datasetTimeRange[1])
                    : dayjs(
                        eventDateRange[1],
                        dateTimeFormatStrings[timeResolution]
                      )
                }
                minDateTime={dayjs(datasetTimeRange[0])}
                format={dateTimeFormatStrings[timeResolution]}
                onError={(error) => setStartDateFieldError(error)}
                slotProps={{
                  textField: {
                    helperText: startDateFieldErrorHandler,
                  },
                }}
              ></DateTimeField>
              <DateTimeField
                maxDateTime={dayjs(datasetTimeRange[1])}
                minDateTime={
                  eventDateRange[0] === ""
                    ? dayjs(datasetTimeRange[0])
                    : dayjs(
                        eventDateRange[0],
                        dateTimeFormatStrings[timeResolution]
                      )
                }
                onChange={(date) =>
                  date !== null
                    ? setEventDateRange([
                        eventDateRange[0],
                        date
                          .format(dateTimeFormatStrings[timeResolution])
                          .toString(),
                      ])
                    : setEventDateRange([eventDateRange[0], ""])
                }
                format={dateTimeFormatStrings[timeResolution]}
                onError={(error) => setEndDateFieldError(error)}
                slotProps={{
                  textField: {
                    helperText: endDateFieldErrorHandler,
                  },
                }}
              ></DateTimeField>
            </LocalizationProvider>
            <CDropdown variant="btn-group">
              <CButton
                onClick={() =>
                  startDateFieldError === null &&
                  endDateFieldError === null &&
                  setEventDateRanges([
                    ...eventDateRanges,
                    ...repeatEvent(
                      eventDateRange,
                      selectedRepeatOption,
                      datasetTimeRange,
                      dateTimeFormatStrings[timeResolution],
                      timeResolution
                    ),
                  ])
                }
              >
                Add Date Range
              </CButton>
              <CDropdownToggle color="primary" split>
                {selectedRepeatOption}
              </CDropdownToggle>
              <CDropdownMenu>
                {repeatOptions.length > 0 &&
                  repeatOptions.map((option, index) => (
                    <CDropdownItem
                      key={index}
                      onClick={() => setSelectedRepeatOption(option)}
                    >
                      {option}
                    </CDropdownItem>
                  ))}
              </CDropdownMenu>
            </CDropdown>
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
              validationStatus.lowerWindow.valid &&
              validationStatus.upperWindow.valid &&
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
