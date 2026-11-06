import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Bell, CheckCheck, Heart, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyState from '../components/EmptyState';
import Spinner from '../components/Spinner';
import { notificationApi } from '../api/services';
import { errMsg } from '../api/client';
import { timeAgo } from '../utils';

const ICONS = { REQUEST_RECEIVED: UserPlus, REQUEST_ACCEPTED: Heart };

export default function Notifications() {
  const navigate = useNavigate();
  const { refreshSummary } = useOutletContext();
  const [list, setList] = useState(null);

  useEffect(() => { notificationApi.list().then(setList).catch((e) => toast.error(errMsg(e))); }, []);

  const open = async (n) => {
    if (!n.read) { await notificationApi.read(n.id).catch(() => {}); refreshSummary(); }
    if (n.link) navigate(n.link);
  };
  const readAll = async () => { await notificationApi.readAll(); setList((l) => l.map((n) => ({ ...n, read: true }))); refreshSummary(); };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>
        {list?.some((n) => !n.read) && <button onClick={readAll} className="btn-ghost !py-2"><CheckCheck className="h-4 w-4" /> Mark all read</button>}
      </div>
      {list === null ? <Spinner /> : list.length === 0 ? <EmptyState icon={Bell} title="You're all caught up" text="Updates about requests and connections show up here." /> : (
        <div className="card divide-y divide-slate-100 overflow-hidden">
          {list.map((n) => { const I = ICONS[n.type] || Bell; return (
            <button key={n.id} onClick={() => open(n)} className={`flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50 ${n.read ? '' : 'bg-brand-50/50'}`}>
              <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${n.type === 'REQUEST_ACCEPTED' ? 'bg-green-100 text-green-600' : 'bg-brand-100 text-brand-600'}`}><I className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1"><p className="font-semibold text-slate-900">{n.title}</p>{n.body && <p className="truncate text-sm text-slate-500">{n.body}</p>}<p className="mt-0.5 text-xs text-slate-400">{timeAgo(n.createdAt)}</p></div>
              {!n.read && <span className="mt-2 h-2.5 w-2.5 rounded-full bg-heart-500" />}
            </button>); })}
        </div>
      )}
    </div>
  );
}
