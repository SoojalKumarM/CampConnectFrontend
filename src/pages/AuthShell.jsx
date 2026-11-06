import Logo from '../components/Logo';
import { BadgeCheck, EyeOff, ShieldCheck } from 'lucide-react';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-700 via-brand-600 to-heart-500 p-12 text-white lg:flex">
        <Logo light />
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold leading-tight">Safe, respectful, student-only dating.</h2>
          {[[BadgeCheck, 'Verified university community'], [EyeOff, 'WhatsApp number hidden until you accept'], [ShieldCheck, 'Block & report in one tap']].map(([I, t]) => (
            <p key={t} className="flex items-center gap-3 text-white/90"><I className="h-5 w-5" /> {t}</p>
          ))}
        </div>
        <p className="text-sm text-white/60">Built by students, for students.</p>
      </div>
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
          <p className="mb-6 mt-1 text-slate-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
