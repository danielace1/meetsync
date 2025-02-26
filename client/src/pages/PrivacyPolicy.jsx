const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-700">Last updated: February 17, 2025</p>

      <h2 className="text-xl font-semibold mt-6 text-gray-900">
        1. Data We Access
      </h2>
      <p className="text-gray-700 mt-2">
        MeetSync requests access to the following Google user data:
      </p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          **Google Calendar Events:** To create, edit, and manage meeting
          schedules.
        </li>
        <li>**Google User Profile & Email:** For authentication purposes.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 text-gray-900">
        2. How We Use Your Data
      </h2>
      <p className="text-gray-700 mt-2">
        We use the collected data solely for the purpose of managing meetings
        and scheduling events. We **do not** use the data for any other purpose,
        and we **do not** sell or share your data with third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 text-gray-900">
        3. Data Protection & Security
      </h2>
      <p className="text-gray-700 mt-2">
        We take security seriously. Your data is protected using industry
        standards, including:
      </p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Secure authentication via Google OAuth.</li>
        <li>Encryption of stored and transmitted data.</li>
        <li>Strict access controls to prevent unauthorized access.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 text-gray-900">
        4. Data Retention & Deletion
      </h2>
      <p className="text-gray-700 mt-2">
        We retain user data only as long as necessary to provide our services.
        Users can request data deletion by contacting us at{" "}
        <a
          href="mailto:asudharsan1805@gmail.com"
          className="text-blue-500 hover:underline"
        >
          asudharsan1805@gmail.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 text-gray-900">
        5. Contact Us
      </h2>
      <p className="text-gray-700 mt-2">
        If you have any concerns regarding your privacy, please contact us at{" "}
        <a
          href="mailto:asudharsan1805@gmail.com"
          className="text-blue-500 hover:underline"
        >
          asudharsan1805@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
