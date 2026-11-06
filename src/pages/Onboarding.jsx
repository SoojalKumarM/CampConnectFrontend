import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';
import Spinner from '../components/Spinner';
import { AboutFields, BasicsFields, PhotoManager, emptyForm, toForm, toPayload } from '../components/ProfileEditor';
import { profileApi } from '../api/services';
import { errMsg } from '../api/client';
import { useAuth } from '../context/AuthContext';

const STEPS = ['Basics', 'About you', 'Photos'];

export default function Onboarding() {
  const { user, refresh, logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [photos, setPhotos] = useState([]);
  const [hasWhatsapp, setHasWhatsapp] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const set = (p) => setForm((f) => ({ ...f, ...p }));

  useEffect(() => {
    profileApi.mine().then((p) => { setForm(toForm(p)); setPhotos(p.photos); setHasWhatsapp(!!p.whatsappNumber); })
      .catch((e) => toast.error(errMsg(e))).finally(() => setLoading(false));
  }, []);

  const validate = () => {
    if (step === 0) {
      if (!form.fullName.trim() || !form.birthDate || !form.gender || !form.university.trim() || !form.department.trim() || !form.yearOfStudy) return 'Please fill in all the fields';
      if (!hasWhatsapp && !form.whatsappNumber.trim()) return 'Please add your WhatsApp number';
    }
    if (step === 1) {
      if (!form.lookingFor) return 'Tell us what you are looking for';
      if (form.interests.length < 3) return 'Pick at least 3 interests';
    }
    return null;
  };

  const save = async () => { await profileApi.update(toPayload(form)); };

  const next = async () => {
    const err = validate();
    if (err) return toast.error(err);
    setBusy(true);
    try { await save(); setHasWhatsapp(true); set({ whatsappNumber: '' }); setStep((s) => s + 1); }
    catch (e) { toast.error(errMsg(e)); } finally { setBusy(false); }
  };

  const finish = async () => {
    setBusy(true);
    try { await profileApi.complete(); await refresh(); toast.success('Profile ready! Time to meet people 🎉'); navigate('/discover', { replace: true }); }
    catch (e) { toast.error(errMsg(e)); } finally { setBusy(false); }
  };

  if (loading) return <Spinner full />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <Logo to="/onboarding" />
        <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-slate-500 hover:text-slate-800">Log out ({user.email})</button>
      </header>
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div className="mb-6 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{i < step ? <Check className="h-4 w-4" /> : i + 1}</span>
              <span className={`hidden text-sm font-semibold sm:block ${i === step ? 'text-slate-900' : 'text-slate-400'}`}>{s}</span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-slate-200" />}
            </div>
          ))}
        </div>

        <div className="card p-6 sm:p-8">
          {step === 0 && (<><h1 className="text-2xl font-extrabold">Let's start with the basics</h1><p className="mb-6 text-sm text-slate-500">This helps people know who they're connecting with.</p><BasicsFields form={form} set={set} hasWhatsapp={hasWhatsapp} /></>)}
          {step === 1 && (<><h1 className="text-2xl font-extrabold">Tell us about you</h1><p className="mb-6 text-sm text-slate-500">Authentic profiles get better connections.</p><AboutFields form={form} set={set} /></>)}
          {step === 2 && (<><h1 className="text-2xl font-extrabold">Add your photos</h1><p className="mb-6 text-sm text-slate-500">At least one clear photo is required.</p><PhotoManager photos={photos} onChange={setPhotos} /></>)}

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? <button className="btn-ghost" onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4" /> Back</button> : <span />}
            {step < 2
              ? <button className="btn-primary" onClick={next} disabled={busy}>{busy ? 'Saving…' : 'Continue'} <ArrowRight className="h-4 w-4" /></button>
              : <button className="btn-heart" onClick={finish} disabled={busy || photos.length === 0}>{busy ? 'Finishing…' : 'Finish & start connecting'}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
