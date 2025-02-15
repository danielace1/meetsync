import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaShareAlt } from "react-icons/fa";
import dayjs from "dayjs";
import { useAuthStore } from "../store/useAuthStore ";
import { useEventStore } from "../store/useEventStore";
import CreateEventModal from "../components/createEventModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEventId, setCopiedEventId] = useState(null);

  // Function to copy meet link
  const copyMeetLink = (link, eventId) => {
    navigator.clipboard.writeText(link);
    setCopiedEventId(eventId);
    setTimeout(() => setCopiedEventId(null), 2000); // Reset after 2s
  };

  const { user } = useAuthStore();
  const { events, fetchEvents, deleteEvent } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center py-5">
      <div className="flex items-center space-x-3 mb-6">
        <img
          src="/logo.png"
          alt="MeetSync"
          className="w-12 h-12 drop-shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
          MeetSync
        </h1>
      </div>

      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-md shadow-xl p-6 flex items-center justify-between rounded-2xl border border-gray-300 transition-all">
        <div className="flex items-center gap-4">
          <img
            src={
              user?.profilePic ||
              `https://ui-avatars.com/api/?background=random&size=36&rounded=true&name=${user?.name}`
            }
            alt={user?.name}
            className="w-16 h-16 rounded-full border-3 border-blue-500 shadow-md transition-transform transform hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            Hi 👋, {user?.name || "User"}
          </h2>
        </div>
      </div>

      {/* Event Card */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-6">
        {events?.length > 0 ? (
          events?.map((event) => (
            <div
              key={event.id}
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-2xl hover:scale-[1.03] group"
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

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={event.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-medium bg-green-500 px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-all"
                >
                  🔗 Join Meet
                </a>
                <button
                  onClick={() => copyMeetLink(event.meetLink, event.id)}
                  className="text-gray-600 hover:text-green-600 transition-all"
                >
                  <FaShareAlt size={18} />
                </button>
                {copiedEventId === event.id && (
                  <span className="text-green-500 text-xs">Copied!</span>
                )}
              </div>

              <div className="absolute top-5 right-5 flex gap-3">
                <button className="text-gray-600 hover:text-blue-500 hover:scale-110 transition-all cursor-pointer">
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-gray-600 hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-5 text-lg">
            No events yet. Click the + button to create one.
          </p>
        )}
      </div>

      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-5 rounded-full shadow-2xl hover:bg-blue-600 transition-all animate-bounce cursor-pointer"
      >
        <FaPlus size={24} />
      </button>

      <CreateEventModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default Home;
