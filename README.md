# Campus Connect — Frontend

> A modern, privacy-first connection platform designed exclusively for verified university students, built with React and Tailwind CSS.

---

## 🌟 Highlights

- **Dual Authentication**: Seamless Google OAuth and secure email/password sign-up flow.
- **Onboarding Wizard**: Multi-step onboarding experience with strict route guards (`public`, `logged-in`, `onboarded`).
- **Discovery Engine**: Advanced filtering, real-time compatibility score calculation, and pagination.
- **Privacy-First Connections**: WhatsApp contact numbers are securely displayed **only after both sides accept** a connection request.
- **Interactive Dashboard**: Manage sent/received requests, view profile galleries, and utilize block/report safety controls.
- **Real-Time Notifications**: Live notification badges, settings management, and full mobile responsiveness (including a bottom navigation bar).

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite
- **Routing**: React Router 6
- **Styling**: Tailwind CSS 3, Lucide React (Icons)
- **Data Fetching**: Axios (Centralized client with automatic JWT injection and 401 error handling)
- **Authentication**: `@react-oauth/google`
- **Notifications**: `react-hot-toast`

---

## 🏗️ Architecture & Project Structure

The project follows a clean separation of concerns where UI components never communicate directly with the API layer:

```text
src/
  main.jsx             Providers wrapper: GoogleOAuthProvider > BrowserRouter > AuthProvider > App
  App.jsx              Central route table (nested routes & security guards)
  routes/Guards.jsx    Route protection logic (RequireAuth, RequireOnboarded, OnboardingOnly, PublicOnly)
  context/             AuthContext managing global session state and JWT tokens
  api/client.js        Single Axios instance with global interceptors
  api/services.js      Dedicated service functions per backend endpoint
  components/          Reusable UI elements (Layout, ProfileCard, ConnectButton, Modal, etc.)
  pages/               Screen-level components mapped to routes
  constants.js         App-wide configurations, country codes, and environment flags