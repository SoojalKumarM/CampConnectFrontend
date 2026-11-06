import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, Send, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from './Modal';
import { connectionApi } from '../api/services';
import { errMsg } from '../api/client';
import { firstName } from '../utils';

const STARTERS = [
  'Hi! We share a few interests — would love to get to know you 😊',
  'Hey! Your profile caught my eye. Coffee on campus sometime?',
  'Hi! Fellow student here — happy to chat if you are!',
];

export default function ConnectButton({ profile, onChanged, size = 'md' }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const pad = size === 'lg' ? '!px-6 !py-3 !text-base' : '';

  if (profile.relation === 'SELF') return null;
  if (profile.relation === 'CONNECTED')
    return <Link to="/connections" className={`btn-ghost !text-green-700 ${pad}`}><Check className="h-4 w-4" /> Connected</Link>;
  if (profile.relation === 'REQUEST_SENT')
    return <button disabled className={`btn-ghost ${pad}`}><Clock className="h-4 w-4" /> Request sent</button>;
  if (profile.relation === 'REQUEST_RECEIVED')
    return <Link to="/requests" className={`btn-primary ${pad}`}>Respond to request</Link>;

  const send = async () => {
    setBusy(true);
    try {
      const dto = await connectionApi.send(profile.userId, message);
      toast.success(dto.status === 'ACCEPTED' ? "It's a match! You're now connected 🎉" : `Request sent to ${firstName(profile.fullName)}`);
      setOpen(false);
      setMessage('');
      onChanged?.(dto.other);
    } catch (e) {
      toast.error(errMsg(e));
    } finally { setBusy(false); }
  };

  return (
    <>
      <button className={`btn-heart ${pad}`} onClick={() => setOpen(true)}><Send className="h-4 w-4" /> Connect</button>
      <Modal open={open} onClose={() => setOpen(false)} title={`Connect with ${firstName(profile.fullName)}`}>
        <label className="label" htmlFor="msg">Add a short note (optional)</label>
        <textarea id="msg" rows={3} maxLength={200} className="input resize-none" value={message}
          onChange={(e) => setMessage(e.target.value)} placeholder="A friendly line goes a long way…" />
        <div className="mt-1 text-right text-xs text-slate-400">{message.length}/200</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {STARTERS.map((s) => (
            <button key={s} type="button" onClick={() => setMessage(s)} className="rounded-full bg-slate-100 px-3 py-1 text-left text-xs text-slate-600 hover:bg-brand-50">
              {s.length > 38 ? s.slice(0, 38) + '…' : s}
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-2 rounded-xl bg-brand-50 p-3 text-xs text-brand-800">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <p>{firstName(profile.fullName)} gets a request in the app plus a WhatsApp heads-up. <b>Your number stays private</b> until they accept.</p>
        </div>
        <button className="btn-heart mt-4 w-full" onClick={send} disabled={busy}>{busy ? 'Sending…' : 'Send request'}</button>
      </Modal>
    </>
  );
}
