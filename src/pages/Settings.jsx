import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, LogOut, ShieldCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import Modal from '../components/Modal';
import { profileApi, safetyApi } from '../api/services';
import { errMsg } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [blocked, setBlocked] = useState([]);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => { safetyApi.blocked().then(setBlocked).catch(() => {}); }, []);

  const toggle = async () => {
    try { const me = await profileApi.setVisibility(!user.visible); setUser(me); toast.success(me.visible ? 'Your profile is visible again' : 'Your profile is now hidden from Discover'); }
    catch (e) { toast.error(errMsg(e)); }
  };
  const unblock = async (id) => { await safetyApi.unblock(id); setBlocked((l) => l.filter((b) => b.userId !== id)); toast.success('Unblocked'); };
  const deactivate = async () => {
    try { await profileApi.deactivate(); logout(); toast.success('Account deactivated'); navigate('/', { replace: true }); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Settings &amp; privacy</h1>

      <section className="card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3"><EyeOff className="mt-0.5 h-5 w-5 text-brand-600" />
            <div><h2 className="font-bold">Show me in Discover</h2><p className="text-sm text-slate-500">Turn off to pause. People you're already connected with can still see you.</p></div></div>
          <button onClick={toggle} role="switch" aria-checked={user.visible} className={`relative h-7 w-12 shrink-0 rounded-full transition ${user.visible ? 'bg-brand-600' : 'bg-slate-300'}`}>
            <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${user.visible ? 'left-[22px]' : 'left-0.5'}`} /></button>
        </div>
      </section>

      <section className="card p-6">
        <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-brand-600" />
          <div><h2 className="font-bold">How your WhatsApp number is protected</h2>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-500">
              <li>It's never shown on your profile or in search.</li>
              <li>When someone sends you a request, Campus Connect sends the WhatsApp heads-up for them — they never see your number.</li>
              <li>Only after you accept does each of you see the other's number.</li>
              <li>Blocking or removing a connection hides it again.</li></ul></div></div>
      </section>

      <section className="card p-6">
        <h2 className="mb-3 font-bold">Blocked people</h2>
        {blocked.length === 0 ? <p className="text-sm text-slate-500">You haven't blocked anyone.</p> : (
          <div className="space-y-2">{blocked.map((b) => (
            <div key={b.userId} className="flex items-center gap-3"><Avatar src={b.photos[0]} name={b.fullName} size="h-10 w-10" text="text-sm" />
              <span className="flex-1 font-medium">{b.fullName}</span><button className="btn-ghost !py-1.5" onClick={() => unblock(b.userId)}>Unblock</button></div>))}</div>)}
      </section>

      <section className="card space-y-3 p-6">
        <button className="btn-ghost w-full" onClick={() => { logout(); navigate('/', { replace: true }); }}><LogOut className="h-4 w-4" /> Log out</button>
        <button className="btn-danger w-full" onClick={() => setConfirm(true)}><Trash2 className="h-4 w-4" /> Deactivate my account</button>
      </section>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Deactivate account?">
        <p className="text-sm text-slate-600">Your profile will be hidden and you'll be logged out. This can't be undone from the app.</p>
        <div className="mt-5 flex gap-2"><button className="btn-ghost flex-1" onClick={() => setConfirm(false)}>Keep account</button><button className="btn-danger flex-1" onClick={deactivate}>Deactivate</button></div>
      </Modal>
    </div>
  );
}
