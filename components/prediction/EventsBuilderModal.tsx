import { useState } from "react";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CButton,
  CFormRange,
} from "@coreui/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";

const removeDate = (dateArray: string[], date: string) => {
  //removes specified date from dateArray and returns the new array
  const index = dateArray.indexOf(date);
  if (index > -1) {
    dateArray.splice(index, 1);
  }
  return dateArray;
};

const EventsBuilderModal = ({ visible, setVisible }: any) => {
  const [eventDates, setEventDates] = useState<string[]>([]);
  // Creates a modal for specifying event parameters name, window size, regularization, mode and dates
  return (
    <CModal
      className="show d-block"
      backdrop={"static"}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Add an Event with all associated dates</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="events-builder-modal__body">
          <div className="events-builder-modal__body__event-settings">
            <h5>Event Settings</h5>
            <CFormInput
              type="text"
              size="sm"
              placeholder="Event name"
            ></CFormInput>
            <CFormRange
              min={0}
              max={1}
              step={0.01}
              label={`Regularization`}
              defaultValue={0.5}
            ></CFormRange>
            <CFormInput
              type="number"
              size="sm"
              placeholder="Event duration (days)"
              defaultValue={1}
            ></CFormInput>
          </div>
          <div className="events-builder-moald__body__dates-box">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(new Date())}
                onChange={(date) =>
                  date !== null &&
                  setEventDates([
                    ...eventDates,
                    date.format("MM-DD-YYYY").toString(),
                  ])
                }
              ></DatePicker>
            </LocalizationProvider>
            <div className="events-builder-modal__body__dates-list">
              {eventDates.map((date, index) => {
                return (
                  <Chip
                    key={index}
                    label={date}
                    onDelete={() => {
                      const newDates = removeDate(
                        [...eventDates],
                        eventDates[index]
                      );
                      setEventDates(newDates);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={() => setVisible(false)}>
          Save Changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EventsBuilderModal;
