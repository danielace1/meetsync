# MeetSync 🚀

Sync Smarter, Meet Better!

MeetSync is a web application that seamlessly integrates with Google Calendar, allowing users to manage and sync their meetings efficiently.

## Live Link

- [Live Link](https://meetsync-alpha.vercel.app/)

## 🌟 Features

- 📅 **Google Calendar Integration** – Easily create and manage meetings.
- 🔗 **Google OAuth Authentication** – Secure login with Google.
- 🎨 **Modern UI** – Built with TailwindCSS for a sleek design.
- ✍️ **Event Management** – Create, edit, delete, and share Google Meet links.
- 📢 **Meet Link Sharing** – Share meeting details via built-in share options.

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, Zustand, TailwindCSS
- **Backend:** Node.js, Express.js, Google Calendar API
- **Authentication:** Google OAuth
- **Database:** MongoDB

## 🚀 Getting Started

### 🔧 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **MongoDB**
- **Google Cloud Project** (OAuth Credentials & Calendar API enabled)

### 📥 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/danielace1/meetsync.git
   cd MeetSync
   ```
2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   - Create a .env file in the root directory and add:

   ```sh
   MONGO_URI =
   PORT =
   LOCAL_CLIENT_URL =
   PRODUCTION_CLIENT_URL =
   JWT_SECRET =
   GOOGLE_CLIENT_ID =
   GOOGLE_CLIENT_SECRET =
   GOOGLE_REDIRECT_URI =
   ```

4. **🔥 Run the App**
   - Start the client and server:
   ```sh
   npm run dev
   ```

## 🤝 Contributing

- [Fork](https://github.com/danielace1/meetsync/fork) the repo & create a feature branch.
- Commit changes & push to your branch.
- Submit a [PR](https://github.com/danielace1/meetsync/pulls) for review.

## 🛡️ License

This project is licensed under the [MIT](./LICENSE) License.

## Author

- [Sudharsan](https://www.instagram.com/code_ace_/)
