const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-700">Last updated: February 17, 2025</p>
      <p className="text-gray-700 mt-4">
        MeetSync does not collect, store, or share any personal data beyond
        authentication. We use Google OAuth for sign-in, and we do not have
        access to your password.
      </p>
      <p className="text-gray-700 mt-4">
        Contact us at{" "}
        <a
          href="mailto:asudharsan1805@gmail.com"
          className="text-blue-500 hover:underline"
        >
          asudharsan1805@gmail.com
        </a>{" "}
        if you have any concerns.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
