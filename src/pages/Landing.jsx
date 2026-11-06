import { Link } from 'react-router-dom';
import { BadgeCheck, BellRing, EyeOff, Heart, MessageCircle, ShieldCheck, Sparkles, UserPlus, Users } from 'lucide-react';
import Logo from '../components/Logo';

const problems = [
  { icon: BadgeCheck, t: 'Real students only', d: 'Verified university emails and profile checks cut fake accounts and catfishing.' },
  { icon: EyeOff, t: 'Your number stays private', d: 'Nobody sees your WhatsApp number until you accept their request. You decide.' },
  { icon: Sparkles, t: 'Intent-first matching', d: 'Say what you are looking for and match on interests, course and campus life.' },
  { icon: ShieldCheck, t: 'Safety built in', d: 'Block, report and hide your profile anytime. Daily request limits discourage spam.' },
];
const steps = [
  { icon: UserPlus, t: 'Create your profile', d: 'Sign up with Google or email, add photos, interests and your private WhatsApp number.' },
  { icon: Heart, t: 'Send a connection request', d: 'Pick someone you click with. They get an in-app request and a WhatsApp heads-up.' },
  { icon: Users, t: 'Accept → numbers unlock', d: 'When they accept, both WhatsApp numbers become visible to each other. Start talking.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />
        <div className="flex items-center gap-2">
          <Link to="/login" className="btn-ghost">Log in</Link>
          <Link to="/register" className="btn-primary hidden sm:inline-flex">Join free</Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-heart-500 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur"><BadgeCheck className="h-4 w-4" /> Made for university students</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Meaningful connections, <span className="text-pink-200">right on your campus.</span></h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">No awkward cold DMs. No random strangers. Meet verified students who share your interests, with privacy and consent at every step.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn bg-white !px-6 !py-3 !text-base text-brand-700 hover:bg-slate-100">Create your profile</Link>
              <Link to="/login" className="btn border border-white/40 !px-6 !py-3 !text-base text-white hover:bg-white/10">I have an account</Link>
            </div>
            <p className="mt-4 text-sm text-white/70">Free · 18+ · Takes 3 minutes</p>
          </div>
          <div className="hidden md:block">
            <div className="relative mx-auto w-72 rotate-3 rounded-3xl bg-white p-4 text-slate-800 shadow-2xl">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-200 to-heart-100" />
              <p className="mt-3 flex items-center gap-1.5 font-bold">Ananya, 21 <BadgeCheck className="h-4 w-4 text-sky-500" /></p>
              <p className="text-xs text-slate-500">Computer Science · Year 3</p>
              <div className="mt-2 flex gap-1.5"><span className="chip">Coding</span><span className="chip">Coffee</span><span className="chip">Hiking</span></div>
              <div className="absolute -left-10 top-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-green-700 shadow-xl"><MessageCircle className="h-4 w-4" /> WhatsApp unlocked 🎉</div>
              <div className="absolute -right-8 bottom-16 rounded-2xl bg-heart-500 px-3 py-2 text-xs font-bold text-white shadow-xl">92% match</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Dating on campus is harder than it should be</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-500">We built Campus Connect to fix the real problems students face.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon: I, t, d }) => (
            <div key={t} className="card p-6"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><I className="h-6 w-6" /></div>
              <h3 className="font-bold text-slate-900">{t}</h3><p className="mt-1 text-sm text-slate-500">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: I, t, d }, i) => (
              <div key={t} className="card relative p-6">
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-slate-100">{i + 1}</span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-heart-500 text-white"><I className="h-6 w-6" /></div>
                <h3 className="font-bold text-slate-900">{t}</h3><p className="mt-1 text-sm text-slate-500">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <BellRing className="mx-auto h-10 w-10 text-brand-600" />
        <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Ready to meet someone real?</h2>
        <Link to="/register" className="btn-heart mt-6 !px-8 !py-3 !text-base">Get started — it's free</Link>
      </section>
      <footer className="border-t py-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Campus Connect · Built by students, for students · Be kind. Be safe.</footer>
    </div>
  );
}
