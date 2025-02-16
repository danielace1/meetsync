import { FaGithub } from "react-icons/fa";

const TheHeader = () => {
  return (
    <div>
      <a
        href="https://github.com/danielace1/meetsync"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-2 md:top-5 right-2 md:right-5 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-md text-white border border-white/30 hover:bg-white/30 transition-all z-50"
      >
        <FaGithub size={24} className="text-black" />
      </a>
    </div>
  );
};

export default TheHeader;
