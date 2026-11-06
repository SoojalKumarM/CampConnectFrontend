import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { BadgeCheck, Copy, MessageCircle, UserMinus, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { connectionApi } from '../api/services';
import { errMsg } from '../api/client';
import { firstName, timeAgo } from '../utils';

export default function Connections() {
  const { refreshSummary } = useOutletContext();
  const [list, setList] = useState(null);
  const [removing, setRemoving] = useState(null);

  const load = () => connectionApi.connections().then(setList).catch((e) => toast.error(errMsg(e)));
  useEffect(() => { load(); }, []);

  const copy = (n) => navigator.clipboard?.writeText(n).then(() => toast.success('Number copied'));
  const remove = async () => {
    try { await connectionApi.remove(removing.id); toast.success('Connection removed'); setRemoving(null); load(); refreshSummary(); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold text-slate-900">Your connections</h1>
      <p className="mb-5 text-sm text-slate-500">WhatsApp numbers are only visible between people who accepted each other.</p>
      {list === null ? <Spinner /> : list.length === 0 ? (
        <EmptyState icon={Users} title="No connections yet" text="Once a request is accepted, you'll see each other's WhatsApp number here." action={<Link to="/discover" className="btn-primary">Discover people</Link>} />
      ) : (
        <div className="space-y-3">
          {list.map((c) => { const o = c.other; return (
            <div key={c.id} className="card p-4">
              <div className="flex items-center gap-4">
                <Link to={`/profile/${o.userId}`}><Avatar src={o.photos[0]} name={o.fullName} size="h-16 w-16" text="text-xl" /></Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/profile/${o.userId}`} className="flex items-center gap-1.5 font-bold text-slate-900">{o.fullName}{o.verifiedStudent && <BadgeCheck className="h-4 w-4 text-sky-500" />}</Link>
                  <p className="truncate text-sm text-slate-500">{o.department} · {o.university}</p>
                  <p className="text-xs text-slate-400">Connected {timeAgo(c.respondedAt)}</p>
                </div>
                <button onClick={() => setRemoving(c)} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Remove connection"><UserMinus className="h-5 w-5" /></button>
              </div>
              <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-green-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-xs font-semibold uppercase tracking-wide text-green-700">WhatsApp</p><p className="text-lg font-bold text-slate-900">{o.whatsappNumber}</p></div>
                <div className="flex gap-2">
                  <button className="btn-ghost !py-2" onClick={() => copy(o.whatsappNumber)}><Copy className="h-4 w-4" /> Copy</button>
                  <a className="btn-wa !py-2" href={o.whatsappLink} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Chat</a>
                </div>
              </div>
            </div>); })}
        </div>
      )}
      <Modal open={!!removing} onClose={() => setRemoving(null)} title="Remove connection?">
        <p className="text-sm text-slate-600">You and {removing && firstName(removing.other.fullName)} will no longer see each other's WhatsApp numbers.</p>
        <div className="mt-5 flex gap-2"><button className="btn-ghost flex-1" onClick={() => setRemoving(null)}>Cancel</button><button className="btn-danger flex-1" onClick={remove}>Remove</button></div>
      </Modal>
    </div>
  );
}
