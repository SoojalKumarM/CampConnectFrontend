import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

/** Logged-in users only. */
export function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Spinner full />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

/** Logged-in AND finished onboarding (profile + WhatsApp + photo). */
export function RequireOnboarded() {
  const { user } = useAuth();
  if (!user.profileComplete) return <Navigate to="/onboarding" replace />;
  return <Outlet />;
}

/** Onboarding page: skip it if already complete. */
export function OnboardingOnly() {
  const { user } = useAuth();
  if (user.profileComplete) return <Navigate to="/home" replace />;
  return <Outlet />;
}

/** Landing / login / register: bounce logged-in users to the app. */
export function PublicOnly() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner full />;
  if (user) return <Navigate to={user.profileComplete ? '/home' : '/onboarding'} replace />;
  return <Outlet />;
}
