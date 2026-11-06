import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Bell, Compass, ShieldCheck, UserPlus, Users } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import Spinner from '../components/Spinner';
import { discoverApi } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { firstName } from '../utils';

const Tile = ({ to, icon: Icon, n, label, tone }) => (
  <Link to={to} className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-6 w-6" /></span>
    <div><p className="text-2xl font-extrabold text-slate-900">{n}</p><p className="text-sm text-slate-500">{label}</p></div>
  </Link>
);

export default function Home() {
  const { user } = useAuth();
  const { summary, refreshSummary } = useOutletContext();
  const [top, setTop] = useState(null);

  useEffect(() => { discoverApi.top().then(setTop).catch(() => setTop([])); }, []);
  const update = (p) => { setTop((l) => l.map((x) => (x.userId === p.userId ? p : x))); refreshSummary(); };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-heart-500 p-6 text-white sm:p-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Hey {firstName(user.fullName)} 👋</h1>
        <p className="mt-1 text-white/85">
          {summary.receivedPending > 0 ? `You have ${summary.receivedPending} pending connection request${summary.receivedPending > 1 ? 's' : ''}.` : 'Ready to meet someone new today?'}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/discover" className="btn bg-white text-brand-700 hover:bg-slate-100"><Compass className="h-4 w-4" /> Discover people</Link>
          {summary.receivedPending > 0 && <Link to="/requests" className="btn border border-white/40 text-white hover:bg-white/10">View requests</Link>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile to="/requests" icon={UserPlus} n={summary.receivedPending} label="Requests to review" tone="bg-heart-50 text-heart-600" />
        <Tile to="/requests" icon={ArrowRight} n={summary.sentPending} label="Awaiting reply" tone="bg-amber-50 text-amber-600" />
        <Tile to="/connections" icon={Users} n={summary.connections} label="Connections" tone="bg-green-50 text-green-600" />
        <Tile to="/notifications" icon={Bell} n={summary.unreadNotifications} label="Unread updates" tone="bg-brand-50 text-brand-600" />
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div><h2 className="text-xl font-extrabold text-slate-900">Top matches for you</h2><p className="text-sm text-slate-500">Based on shared interests, intent and campus.</p></div>
          <Link to="/discover" className="text-sm font-semibold text-brand-600">See all →</Link>
        </div>
        {top === null ? <Spinner /> : top.length === 0
          ? <div className="card p-8 text-center text-slate-500">No new matches right now. Check back soon as more students join!</div>
          : <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{top.slice(0, 4).map((p) => <ProfileCard key={p.userId} profile={p} onChanged={update} />)}</div>}
      </section>

      <div className="card flex items-start gap-3 p-5 text-sm text-slate-600">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <p><b className="text-slate-900">Stay safe:</b> meet in public places first, tell a friend where you're going, and never share money or personal documents. Use Block &amp; Report on any profile if something feels off.</p>
      </div>
    </div>
  );
}
