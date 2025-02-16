import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaTimes, FaAlignLeft } from "react-icons/fa";
import DateTimeInput from "./DateTimeInput";
import { useEventStore } from "../store/useEventStore";

const CreateMeetingModal = ({ isOpen, onClose, event }) => {
  const [formData, setFormData] = useState({
    title: "",
    startTime: undefined,
    endTime: undefined,
    description: "",
  });

  const { createEvent, updateEvent } = useEventStore();

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        startTime: event.startTime ? new Date(event.startTime) : null,
        endTime: event.endTime ? new Date(event.endTime) : null,
        description: event.description || "",
      });
    }
  }, [event]);

  if (!isOpen) return null;

  const handleStartTimeChange = (date) => {
    setFormData({
      ...formData,
      startTime: date || undefined,
      endTime: undefined,
    });
  };

  const handleEndTimeChange = (date) => {
    setFormData({ ...formData, endTime: date || undefined });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    if (event) {
      updateEvent({ eventId: event.googleEventId, ...formData });
    } else {
      createEvent(formData);
    }

    setFormData({
      title: "",
      startTime: null,
      endTime: null,
      description: "",
    });
    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      startTime: null,
      endTime: null,
      description: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
      <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 p-6 rounded-3xl shadow-2xl w-[450px] relative animate-fade-in border border-gray-300">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer transition-transform transform hover:scale-110"
          onClick={handleClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center tracking-wide">
          📅 Schedule a Meeting
        </h2>

        {/* form */}
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <FaAlignLeft className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="title"
              placeholder="Meeting Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full outline-none pl-10 border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-blue-400 shadow-sm"
              required
            />
          </div>

          <DateTimeInput
            selected={formData.startTime}
            onChange={handleStartTimeChange}
            minDate={new Date()}
            minTime={new Date()}
            placeholder="Start Time"
            required
          />

          <DateTimeInput
            selected={formData.endTime}
            onChange={handleEndTimeChange}
            minDate={formData.startTime || new Date()}
            minTime={
              formData.startTime ? new Date(formData.startTime) : new Date()
            }
            disabled={!formData.startTime}
            placeholder="End Time"
          />

          <textarea
            name="description"
            placeholder="Meeting Description"
            value={formData.description}
            onChange={handleChange}
            max={250}
            className="border outline-none border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-blue-400 shadow-sm resize-none"
            rows="3"
          />

          <button className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition-all cursor-pointer text-lg font-semibold">
            🚀 Schedule Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

CreateMeetingModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  event: PropTypes.object,
};

export default CreateMeetingModal;
