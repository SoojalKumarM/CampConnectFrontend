import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Compass, Home, LogOut, Settings, UserCircle, UserPlus, Users } from 'lucide-react';
import Logo from './Logo';
import Avatar from './Avatar';
import { useAuth } from '../context/AuthContext';
import { connectionApi } from '../api/services';

const NAV = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/requests', label: 'Requests', icon: UserPlus, badge: 'receivedPending' },
  { to: '/connections', label: 'Connections', icon: Users },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [summary, setSummary] = useState({ receivedPending: 0, sentPending: 0, connections: 0, unreadNotifications: 0 });
  const [menu, setMenu] = useState(false);

  const refreshSummary = useCallback(() => connectionApi.summary().then(setSummary).catch(() => {}), []);

  useEffect(() => { refreshSummary(); setMenu(false); }, [location.pathname, refreshSummary]);
  useEffect(() => { const t = setInterval(refreshSummary, 30000); return () => clearInterval(t); }, [refreshSummary]);

  const Badge = ({ n }) => n > 0 ? <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-heart-500 px-1 text-[11px] font-bold text-white">{n > 9 ? '9+' : n}</span> : null;
  const doLogout = () => { logout(); navigate('/', { replace: true }); };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo to="/home" />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map(({ to, label, icon: Icon, badge }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center rounded-xl px-3.5 py-2 text-sm font-semibold transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Icon className="mr-1.5 h-4 w-4" /> {label} {badge && <Badge n={summary[badge]} />}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/notifications" className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {summary.unreadNotifications > 0 && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-heart-500 ring-2 ring-white" />}
            </Link>
            <div className="relative">
              <button onClick={() => setMenu((m) => !m)} aria-label="Account menu"><Avatar src={user.photoUrl} name={user.fullName} size="h-9 w-9" text="text-sm" /></button>
              {menu && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-100 bg-white py-1 shadow-xl">
                  <p className="truncate px-4 py-2 text-xs text-slate-400">{user.email}</p>
                  <Link to="/me" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50"><UserCircle className="h-4 w-4" /> My profile</Link>
                  <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50"><Settings className="h-4 w-4" /> Settings &amp; privacy</Link>
                  <button onClick={doLogout} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" /> Log out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet context={{ summary, refreshSummary }} />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {[...NAV, { to: '/me', label: 'Me', icon: UserCircle }].map(({ to, label, icon: Icon, badge }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold ${isActive ? 'text-brand-600' : 'text-slate-500'}`}>
            <Icon className="h-5 w-5" /> {label}
            {badge && summary[badge] > 0 && <span className="absolute right-[28%] top-1.5 h-2.5 w-2.5 rounded-full bg-heart-500" />}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
