import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthShell from './AuthShell';
import GoogleButton from '../components/GoogleButton';
import { authApi } from '../api/services';
import { errMsg } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from;
  const [form, setForm] = useState({ email: '', password: '' });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { token, user } = await authApi.login(form);
      login(token, user);
      navigate(user.profileComplete ? (from || '/home') : '/onboarding', { replace: true });
    } catch (err) { toast.error(errMsg(err)); } finally { setBusy(false); }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to see who's connected with you.">
      <GoogleButton text="signin_with" />
      <div className="my-5 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" /> or with email <span className="h-px flex-1 bg-slate-200" /></div>
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label">Email</label><input type="email" required className="input" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className="label">Password</label><input type="password" required className="input" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">New here? <Link to="/register" className="font-semibold text-brand-600">Create an account</Link></p>
    </AuthShell>
  );
}
