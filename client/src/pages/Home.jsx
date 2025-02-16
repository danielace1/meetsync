import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaShareAlt,
  FaPowerOff,
} from "react-icons/fa";
import dayjs from "dayjs";

import { useAuthStore } from "../store/useAuthStore ";
import { useEventStore } from "../store/useEventStore";
import CreateEventModal from "../components/createEventModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedEventId, setCopiedEventId] = useState(null);
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const { events, fetchEvents, deleteEvent } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };
  const editModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
    setIsModalOpen(false);
  };

  const shareMeetLink = async (event) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Meeting Details:\nJoin with Google Meet: ${event.meetLink}\n\nLooking forward to seeing you there!`,
          url: event.meetLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(event.meetLink);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 2000);
    }
  };

  const handleLogout = () => {
    logout({ navigate });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center py-5">
      <div className="flex items-center space-x-3 mb-6">
        <img
          src="/logo.png"
          alt="MeetSync"
          className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg"
        />
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-wide">
          MeetSync
        </h1>
      </div>

      {/* Profile */}
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-md shadow-xl p-4 md:p-6 flex items-center justify-between rounded-2xl border border-gray-300 transition-all">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src={
              user?.profilePic ||
              `https://ui-avatars.com/api/?background=random&size=36&rounded=true&name=${user?.name}`
            }
            alt={user?.name}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 md:border-3 border-blue-500 shadow-md transition-transform transform hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Hi 👋, {user?.name || "User"}
          </h2>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 md:p-3 rounded-full text-red-500 transition-all shadow-md cursor-pointer hover:bg-red-100"
          title="Logout"
        >
          <FaPowerOff size={18} md:size={20} />
        </button>
      </div>
      {/* Event Card */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {events?.length > 0 ? (
          events?.map((event) => (
            <div
              key={event.id}
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-2xl hover:scale-[1.01] group"
            >
              <div className="absolute -top-5 -left-4 bg-white p-2 rounded-full shadow-md">
                <img
                  src="/google-meet.webp"
                  alt="Google Meet"
                  className="w-9 h-9"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>

              <p className="text-gray-700 text-sm italic">
                {dayjs(event.startTime).format("MMM D, YYYY h:mm A")}
                {event.endTime && ` - ${dayjs(event.endTime).format("h:mm A")}`}
              </p>

              <p className="text-gray-700 mt-3 text-sm">{event.description}</p>

              <div className="mt-4 flex items-center gap-4">
                <a
                  href={event.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-medium bg-green-500 px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-all"
                >
                  🔗 Join Meet
                </a>
                <button
                  onClick={() => shareMeetLink(event)}
                  className="text-gray-600 hover:text-yellow-500 transition-all cursor-pointer"
                >
                  <FaShareAlt size={19} />
                </button>
                {copiedEventId === event.id && (
                  <span className="text-yellow-500 text-xs">Copied!</span>
                )}
              </div>

              {/* Edit and delete */}
              <div className="absolute top-5 right-5 flex gap-3">
                <button
                  onClick={() => editModal(event)}
                  className="text-gray-600 hover:text-blue-500 hover:scale-110 transition-all cursor-pointer"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => deleteEvent(event.googleEventId)}
                  className="text-gray-600 hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
                >
                  <FaTrash size={19} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center w-full h-[400px]">
            <img
              src="/no-events.webp"
              className="w-56 h-56 opacity-75"
              alt="No Meets"
            />
            <p className="text-gray-500 mt-4 text-lg text-center max-w-md">
              No Google Meets scheduled yet. Start a new meeting and connect
              with your team!
            </p>
          </div>
        )}
      </div>

      <button
        onClick={openModal}
        className="fixed bottom-3 md:bottom-8 right-2 md:right-8 bg-blue-500 text-white p-4 md:p-5 rounded-full shadow-2xl hover:bg-blue-600 transition-all cursor-pointer z-10 animate-bounce"
      >
        <FaPlus className="size-5 md:size-6" />
      </button>

      <CreateEventModal
        isOpen={isModalOpen || isEditModalOpen}
        onClose={closeModal}
        onEdit={editModal}
        event={selectedEvent}
      />
    </div>
  );
};
export default Home;
