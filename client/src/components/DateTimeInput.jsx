import PropTypes from "prop-types";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimeInput = ({
  selected,
  onChange,
  minDate,
  placeholder,
  disabled,
}) => {
  return (
    <div className="relative w-full">
      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        timeFormat="hh:mm aa"
        timeIntervals={15}
        dateFormat="dd-MM-yyyy hh:mm aa"
        minDate={minDate}
        minTime={new Date()}
        maxTime={new Date().setHours(23, 59, 59)}
        className={`w-full outline-none pl-12 border border-gray-300 rounded-lg p-4 focus:ring-1 focus:ring-blue-400 shadow-sm text-lg ${
          disabled ? "cursor-not-allowed bg-gray-100" : "cursor-pointer"
        }`}
        disabled={disabled}
        placeholderText={placeholder}
        shouldCloseOnSelect={true}
        onKeyDown={(e) => e.preventDefault()} // Prevents typing
      />
    </div>
  );
};

DateTimeInput.propTypes = {
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};
export default DateTimeInput;
