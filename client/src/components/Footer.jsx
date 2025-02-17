const Footer = () => {
  return (
    <footer className="py-3 md:py-4 text-sm text-white bg-gradient-to-r from-blue-500/50 to-indigo-500/65 backdrop-blur-lg flex items-center justify-center relative">
      <div>
        Made with ❤️ by
        <a
          href="https://github.com/danielace1"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline ml-1 text-gray-100 cursor-pointer"
        >
          Sudharsan
        </a>
      </div>
      <a
        href="/privacy-policy"
        className="absolute right-4 text-gray-100 hover:underline"
      >
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
