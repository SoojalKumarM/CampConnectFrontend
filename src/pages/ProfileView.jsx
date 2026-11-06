import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Ban, ChevronLeft, ChevronRight, Flag, GraduationCap, Heart, MessageCircle, Sparkles, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import ConnectButton from '../components/ConnectButton';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';
import { profileApi, safetyApi } from '../api/services';
import { errMsg } from '../api/client';
import { REPORT_REASONS, genderLabel, lookingForLabel } from '../constants';
import { firstName } from '../utils';

export default function ProfileView() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { refreshSummary } = useOutletContext();
  const [p, setP] = useState(null);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(0);
  const [modal, setModal] = useState(null); // 'report' | 'block'
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const load = useCallback(() => {
    setP(null); setError(null); setImg(0);
    profileApi.view(userId).then(setP).catch((e) => setError(errMsg(e)));
  }, [userId]);
  useEffect(load, [load]);

  if (error) return <EmptyState title="Profile unavailable" text={error} action={<Link to="/discover" className="btn-primary">Back to discover</Link>} />;
  if (!p) return <Spinner />;

  const photos = p.photos.length ? p.photos : [null];
  const doBlock = async () => { try { await safetyApi.block(p.userId); toast.success('Blocked. You won’t see each other anymore.'); refreshSummary(); navigate('/discover', { replace: true }); } catch (e) { toast.error(errMsg(e)); } };
  const doReport = async () => {
    if (!reason) return toast.error('Please pick a reason');
    try { await safetyApi.report({ userId: p.userId, reason, details }); toast.success('Thanks for keeping Campus Connect safe. They’ve been blocked.'); refreshSummary(); navigate('/discover', { replace: true }); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"><ArrowLeft className="h-4 w-4" /> Back</button>
      <div className="card grid overflow-hidden md:grid-cols-2">
        <div className="relative aspect-[4/5] bg-slate-100 md:aspect-auto md:min-h-[520px]">
          {photos[img] ? <img src={photos[img]} alt={p.fullName} className="absolute inset-0 h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-7xl font-bold text-slate-300">{p.fullName[0]}</div>}
          {photos.length > 1 && (<>
            <button onClick={() => setImg((img - 1 + photos.length) % photos.length)} className="absolute left-3 top-1/2 rounded-full bg-white/90 p-2 shadow" aria-label="Previous photo"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => setImg((img + 1) % photos.length)} className="absolute right-3 top-1/2 rounded-full bg-white/90 p-2 shadow" aria-label="Next photo"><ChevronRight className="h-5 w-5" /></button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">{photos.map((_, i) => <span key={i} className={`h-1.5 rounded-full ${i === img ? 'w-6 bg-white' : 'w-1.5 bg-white/60'}`} />)}</div>
          </>)}
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-extrabold text-slate-900">{firstName(p.fullName)}, {p.age}
                {p.verifiedStudent && <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700"><BadgeCheck className="h-4 w-4" /> Verified student</span>}</h1>
              <p className="mt-1 text-sm text-slate-500">{genderLabel(p.gender)}</p>
            </div>
            {p.relation !== 'SELF' && (
              <div className="flex gap-1">
                <button onClick={() => setModal('report')} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Report"><Flag className="h-5 w-5" /></button>
                <button onClick={() => setModal('block')} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600" title="Block"><Ban className="h-5 w-5" /></button>
              </div>
            )}
          </div>

          <div className="mt-5 space-y-2 text-sm text-slate-700">
            <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-brand-600" /> {p.department} · Year {p.yearOfStudy}</p>
            <p className="flex items-center gap-2"><span className="w-4 text-center">🏛️</span> {p.university}</p>
            <p className="flex items-center gap-2"><Target className="h-4 w-4 text-brand-600" /> {lookingForLabel(p.lookingFor)}</p>
          </div>

          {p.compatibility != null && (
            <div className="mt-5 rounded-2xl bg-brand-50 p-4">
              <div className="flex items-center justify-between text-sm font-bold text-brand-800"><span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Compatibility</span><span>{p.compatibility}%</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-heart-500" style={{ width: `${p.compatibility}%` }} /></div>
              <p className="mt-2 text-xs text-brand-700">{p.sharedInterests.length ? `You both like ${p.sharedInterests.join(', ')}` : 'Different interests can make conversations interesting!'}</p>
            </div>
          )}

          {p.bio && <div className="mt-5"><h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">About</h2><p className="mt-1 whitespace-pre-line text-slate-700">{p.bio}</p></div>}
          <div className="mt-5"><h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">Interests</h2>
            <div className="mt-2 flex flex-wrap gap-2">{p.interests.map((i) => <span key={i} className={p.sharedInterests?.includes(i) ? 'chip !bg-heart-50 !text-heart-600' : 'chip'}>{i}</span>)}</div></div>

          <div className="mt-auto pt-8">
            {p.relation === 'CONNECTED' ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-green-800"><Heart className="h-4 w-4" fill="currentColor" /> You're connected</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{p.whatsappNumber}</p>
                <a href={p.whatsappLink} target="_blank" rel="noreferrer" className="btn-wa mt-3 w-full"><MessageCircle className="h-4 w-4" /> Message on WhatsApp</a>
              </div>
            ) : p.relation === 'SELF' ? (
              <Link to="/me" className="btn-primary w-full">Edit my profile</Link>
            ) : (
              <><ConnectButton profile={p} onChanged={(np) => { setP(np); refreshSummary(); }} size="lg" />
                <p className="mt-2 text-xs text-slate-500">Their WhatsApp number unlocks only after they accept your request.</p></>
            )}
          </div>
        </div>
      </div>

      <Modal open={modal === 'block'} onClose={() => setModal(null)} title={`Block ${firstName(p.fullName)}?`}>
        <p className="text-sm text-slate-600">You won't see each other anywhere on Campus Connect, and any connection or request between you will end. WhatsApp numbers will no longer be visible.</p>
        <div className="mt-5 flex gap-2"><button className="btn-ghost flex-1" onClick={() => setModal(null)}>Cancel</button><button className="btn-danger flex-1" onClick={doBlock}>Block</button></div>
      </Modal>
      <Modal open={modal === 'report'} onClose={() => setModal(null)} title={`Report ${firstName(p.fullName)}`}>
        <div className="space-y-2">{REPORT_REASONS.map((r) => (
          <label key={r} className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm ${reason === r ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}>
            <input type="radio" name="reason" checked={reason === r} onChange={() => setReason(r)} /> {r}</label>))}</div>
        <textarea className="input mt-3 resize-none" rows={3} maxLength={1000} placeholder="Anything else we should know? (optional)" value={details} onChange={(e) => setDetails(e.target.value)} />
        <button className="btn-danger mt-4 w-full" onClick={doReport}>Report &amp; block</button>
      </Modal>
    </div>
  );
}
