import { useRef, useState } from 'react';
import { ImagePlus, Star, Trash2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import PhoneField from './PhoneField';
import InterestPicker from './InterestPicker';
import { GENDERS, LOOKING_FOR } from '../constants';
import { profileApi } from '../api/services';
import { errMsg } from '../api/client';

export const emptyForm = {
  fullName: '', birthDate: '', gender: '', lookingFor: '', university: '', department: '',
  yearOfStudy: '', bio: '', interests: [], whatsappNumber: '',
};

export const toForm = (p) => ({
  fullName: p.fullName || '', birthDate: p.birthDate || '', gender: p.gender || '', lookingFor: p.lookingFor || '',
  university: p.university || '', department: p.department || '', yearOfStudy: p.yearOfStudy || '',
  bio: p.bio || '', interests: p.interests || [], whatsappNumber: '',
});

const clean = (v) => (typeof v === 'string' ? (v.trim() === '' ? null : v.trim()) : v);
export const toPayload = (f) => ({
  fullName: f.fullName.trim(),
  birthDate: clean(f.birthDate), gender: clean(f.gender), lookingFor: clean(f.lookingFor),
  university: clean(f.university), department: clean(f.department),
  yearOfStudy: Number(f.yearOfStudy) || null, bio: clean(f.bio),
  interests: f.interests, whatsappNumber: clean(f.whatsappNumber),
});

export function BasicsFields({ form, set, hasWhatsapp }) {
  const [changing, setChanging] = useState(false);   // local state: survives while the user edits the phone field
  const maxDob = new Date(Date.now() - 18 * 365.25 * 864e5).toISOString().slice(0, 10);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><label className="label">Full name</label>
        <input className="input" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} /></div>
      <div><label className="label">Date of birth</label>
        <input type="date" max={maxDob} className="input" value={form.birthDate} onChange={(e) => set({ birthDate: e.target.value })} /></div>
      <div><label className="label">Gender</label>
        <select className="input" value={form.gender} onChange={(e) => set({ gender: e.target.value })}>
          <option value="">Select…</option>{GENDERS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select></div>
      <div className="sm:col-span-2"><label className="label">University</label>
        <input className="input" placeholder="e.g. University of Debrecen" value={form.university} onChange={(e) => set({ university: e.target.value })} /></div>
      <div><label className="label">Department / course</label>
        <input className="input" placeholder="e.g. Computer Science" value={form.department} onChange={(e) => set({ department: e.target.value })} /></div>
      <div><label className="label">Year of study</label>
        <select className="input" value={form.yearOfStudy} onChange={(e) => set({ yearOfStudy: e.target.value })}>
          <option value="">Select…</option>{[1, 2, 3, 4, 5, 6].map((y) => <option key={y} value={y}>Year {y}</option>)}
        </select></div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="wa">WhatsApp number</label>
        {hasWhatsapp && !changing ? (
          <div className="flex items-center justify-between gap-2 rounded-xl bg-green-50 px-3.5 py-2.5 text-sm text-green-800">
            <span className="flex items-center gap-2"><Lock className="h-4 w-4" /> Saved &amp; private</span>
            <button type="button" className="font-semibold text-brand-600" onClick={() => setChanging(true)}>Change number</button>
          </div>
        ) : (
          <>
            <PhoneField value={form.whatsappNumber} onChange={(v) => set({ whatsappNumber: v })} />
            {hasWhatsapp && <button type="button" className="mt-1.5 text-xs font-semibold text-slate-500" onClick={() => { set({ whatsappNumber: '' }); setChanging(false); }}>Keep my current number</button>}
          </>
        )}
        <p className="mt-1.5 text-xs text-slate-500">🔒 Hidden from everyone. Revealed only to people whose connection request you accept (and vice-versa).</p>
      </div>
    </div>
  );
}

export function AboutFields({ form, set }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="label">What are you looking for?</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {LOOKING_FOR.map((l) => (
            <button type="button" key={l.value} onClick={() => set({ lookingFor: l.value })}
              className={`rounded-xl border p-3 text-left transition ${form.lookingFor === l.value ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-100' : 'border-slate-200 hover:border-brand-300'}`}>
              <p className="text-sm font-semibold">{l.label}</p><p className="text-xs text-slate-500">{l.hint}</p>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label">About you</label>
        <textarea rows={4} maxLength={500} className="input resize-none" placeholder="What are you passionate about? What makes a great weekend for you?"
          value={form.bio} onChange={(e) => set({ bio: e.target.value })} />
        <p className="mt-1 text-right text-xs text-slate-400">{form.bio.length}/500</p>
      </div>
      <div><label className="label">Interests</label><InterestPicker value={form.interests} onChange={(interests) => set({ interests })} /></div>
    </div>
  );
}

export function PhotoManager({ photos, onChange }) {
  const input = useRef();
  const [busy, setBusy] = useState(false);
  const run = async (fn) => { setBusy(true); try { onChange((await fn()).photos); } catch (e) { toast.error(errMsg(e)); } finally { setBusy(false); } };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((url, i) => (
          <div key={url} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100">
            <img src={url} alt="" className="h-full w-full object-cover" />
            {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">MAIN</span>}
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/60 p-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
              {i !== 0 ? <button type="button" onClick={() => run(() => profileApi.makePrimary(i))} className="rounded-full bg-white/90 p-1.5" title="Make main"><Star className="h-4 w-4" /></button> : <span />}
              <button type="button" onClick={() => run(() => profileApi.removePhoto(i))} className="rounded-full bg-white/90 p-1.5 text-red-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {photos.length < 4 && (
          <button type="button" disabled={busy} onClick={() => input.current.click()}
            className="flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-brand-400 hover:text-brand-600">
            <ImagePlus className="h-7 w-7" /><span className="text-xs font-semibold">{busy ? 'Uploading…' : 'Add photo'}</span>
          </button>
        )}
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" hidden
        onChange={(e) => { const f = e.target.files[0]; e.target.value = ''; if (f) run(() => profileApi.addPhoto(f)); }} />
      <p className="mt-2 text-xs text-slate-500">Clear, recent, face-visible photos get far more responses. JPG/PNG/WEBP, up to 5 MB, max 4.</p>
    </div>
  );
}
