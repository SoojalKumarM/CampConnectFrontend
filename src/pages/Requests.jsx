import { useCallback, useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { BadgeCheck, Check, Clock, Inbox, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import Spinner from '../components/Spinner';
import { connectionApi } from '../api/services';
import { errMsg } from '../api/client';
import { firstName, timeAgo } from '../utils';

function Row({ r, children }) {
  const o = r.other;
  return (
    <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <Link to={`/profile/${o.userId}`} className="flex flex-1 items-center gap-4">
        <Avatar src={o.photos[0]} name={o.fullName} size="h-16 w-16" text="text-xl" />
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-bold text-slate-900">{o.fullName}, {o.age}{o.verifiedStudent && <BadgeCheck className="h-4 w-4 text-sky-500" />}</p>
          <p className="truncate text-sm text-slate-500">{o.department} · Year {o.yearOfStudy} · {o.university}</p>
          {r.message && <p className="mt-1.5 rounded-xl rounded-tl-sm bg-slate-100 px-3 py-1.5 text-sm text-slate-700">“{r.message}”</p>}
          <p className="mt-1 text-xs text-slate-400">{timeAgo(r.createdAt)}{o.compatibility != null && ` · ${o.compatibility}% match`}</p>
        </div>
      </Link>
      <div className="flex gap-2 sm:flex-col">{children}</div>
    </div>
  );
}

export default function Requests() {
  const { summary, refreshSummary } = useOutletContext();
  const [tab, setTab] = useState('received');
  const [received, setReceived] = useState(null);
  const [sent, setSent] = useState(null);
  const [busy, setBusy] = useState(null);

  const load = useCallback(() => {
    connectionApi.received().then(setReceived).catch((e) => toast.error(errMsg(e)));
    connectionApi.sent().then(setSent).catch((e) => toast.error(errMsg(e)));
    refreshSummary();
  }, [refreshSummary]);
  useEffect(load, [load]);

  const act = async (id, fn, okMsg) => {
    setBusy(id);
    try { await fn(id); toast.success(okMsg); load(); } catch (e) { toast.error(errMsg(e)); } finally { setBusy(null); }
  };

  const list = tab === 'received' ? received : sent;
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold text-slate-900">Connection requests</h1>
      <div className="mb-5 mt-4 inline-flex rounded-2xl bg-slate-100 p-1">
        {[['received', 'Received', summary.receivedPending], ['sent', 'Sent', summary.sentPending]].map(([k, l, n]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${tab === k ? 'bg-white text-brand-700 shadow' : 'text-slate-500'}`}>
            {l}{n > 0 && <span className="ml-1.5 rounded-full bg-heart-500 px-1.5 py-0.5 text-[11px] text-white">{n}</span>}
          </button>
        ))}
      </div>

      {list === null ? <Spinner /> : list.length === 0 ? (
        tab === 'received'
          ? <EmptyState icon={Inbox} title="No pending requests" text="When someone wants to connect, it will show up here." action={<Link to="/discover" className="btn-primary">Discover people</Link>} />
          : <EmptyState icon={Send} title="No requests waiting" text="Requests you send stay here until they respond." action={<Link to="/discover" className="btn-primary">Find someone</Link>} />
      ) : (
        <div className="space-y-3">
          {list.map((r) => (
            <Row key={r.id} r={r}>
              {tab === 'received' ? (<>
                <button className="btn-primary flex-1" disabled={busy === r.id} onClick={() => act(r.id, connectionApi.accept, `Connected with ${firstName(r.other.fullName)}! Their WhatsApp number is in Connections.`)}><Check className="h-4 w-4" /> Accept</button>
                <button className="btn-ghost flex-1" disabled={busy === r.id} onClick={() => act(r.id, connectionApi.decline, 'Request declined')}><X className="h-4 w-4" /> Decline</button>
              </>) : (<>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"><Clock className="h-3.5 w-3.5" /> Pending</span>
                <button className="btn-ghost" disabled={busy === r.id} onClick={() => act(r.id, connectionApi.cancel, 'Request cancelled')}>Cancel</button>
              </>)}
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}
