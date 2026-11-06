import { Route, Routes } from 'react-router-dom';
import { OnboardingOnly, PublicOnly, RequireAuth, RequireOnboarded } from './routes/Guards';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Discover from './pages/Discover';
import ProfileView from './pages/ProfileView';
import MyProfile from './pages/MyProfile';
import Requests from './pages/Requests';
import Connections from './pages/Connections';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route element={<PublicOnly />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* logged in */}
      <Route element={<RequireAuth />}>
        <Route element={<OnboardingOnly />}>
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>

        {/* logged in + profile complete */}
        <Route element={<RequireOnboarded />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile/:userId" element={<ProfileView />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/me" element={<MyProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
