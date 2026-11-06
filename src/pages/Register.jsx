import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthShell from './AuthShell';
import GoogleButton from '../components/GoogleButton';
import PhoneField from '../components/PhoneField';
import { authApi } from '../api/services';
import { errMsg } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', whatsappNumber: '' });
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (p) => setForm((f) => ({ ...f, ...p }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.whatsappNumber) return toast.error('Please add your WhatsApp number');
    if (!agree) return toast.error('Please confirm you are 18+ and accept the terms');
    setBusy(true);
    try {
      const { token, user } = await authApi.register(form);
      login(token, user);
      toast.success('Account created! Let’s build your profile.');
      navigate('/onboarding', { replace: true });
    } catch (err) { toast.error(errMsg(err)); } finally { setBusy(false); }
  };

  return (
    <AuthShell title="Create your account" subtitle="One sign-up, one profile. Takes about 3 minutes.">
      <GoogleButton text="signup_with" />
      <p className="mt-2 text-center text-xs text-slate-400">With Google you'll add your WhatsApp number in the next step.</p>
      <div className="my-5 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" /> or sign up with email <span className="h-px flex-1 bg-slate-200" /></div>
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label">Full name</label><input required className="input" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} /></div>
        <div><label className="label">University email</label><input type="email" required className="input" placeholder="you@university.edu" value={form.email} onChange={(e) => set({ email: e.target.value })} />
          <p className="mt-1 text-xs text-slate-500">Use your university email to earn the “Verified student” badge.</p></div>
        <div><label className="label">Password</label><input type="password" required minLength={8} className="input" autoComplete="new-password" value={form.password} onChange={(e) => set({ password: e.target.value })} />
          <p className="mt-1 text-xs text-slate-500">At least 8 characters.</p></div>
        <div><label className="label" htmlFor="wa">WhatsApp number</label><PhoneField value={form.whatsappNumber} onChange={(v) => set({ whatsappNumber: v })} />
          <p className="mt-1 text-xs text-slate-500">🔒 Private. Only shared with people you accept.</p></div>
        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input type="checkbox" className="mt-1" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          I'm 18 or older and I agree to be respectful and follow the community guidelines.
        </label>
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-brand-600">Log in</Link></p>
    </AuthShell>
  );
}
