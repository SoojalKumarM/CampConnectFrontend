import { Link } from 'react-router-dom';
import {
  ArrowRight, BadgeCheck, BookOpen, Check, ChevronDown, Clock, Coffee, EyeOff, Globe2, Heart, Languages, Lock,
  Mail, MapPin, MessageCircle, ShieldCheck, Smile, Sparkles, UserPlus, Users,
} from 'lucide-react';
import Logo from '../components/Logo';
import { BRAND } from '../constants';

/* ------------------------------------------------------------------ content (edit text here, not in the JSX) */
const NAV = [['how', 'How it works'], ['ways', 'Ways to connect'], ['privacy', 'Privacy'], ['safety', 'Safety'], ['faq', 'FAQ']];

const FACTS = [
  { icon: Clock, big: '3 min', small: 'to set up your profile' },
  { icon: Lock, big: '0', small: 'phone numbers shown before you say yes' },
  { icon: BadgeCheck, big: '100%', small: 'email-verified accounts' },
  { icon: Heart, big: 'Free', small: 'for students, always' },
];

const PROBLEMS = [
  { emoji: '🏛️', t: 'Thousands of people, almost no introductions', d: 'You share lectures, libraries and canteens with hundreds of people, yet it can take a whole semester to meet someone new.' },
  { emoji: '😬', t: 'Cold messages feel awkward', d: 'Writing to a stranger on social media is stressful, and being ignored feels worse. Most people just never try.' },
  { emoji: '📵', t: 'Giving out your number is a big step', d: 'Sharing a phone number too early with someone you barely know is risky. Privacy should be your choice, not a requirement.' },
];

// soon: true = on the roadmap; shows a "Coming soon" badge. Remove the flag when the feature ships.
const WAYS = [
  { icon: BookOpen, t: 'Study buddies', d: 'Find someone in your course or faculty to prepare for exams, share notes and stay motivated.', color: 'bg-sky-50 text-sky-600', soon: true },
  { icon: Languages, t: 'Coffee & language exchange', d: 'Practise a language over a coffee. Perfect for Erasmus and international students.', color: 'bg-amber-50 text-amber-600', soon: true },
  { icon: Users, t: 'Campus friends', d: 'New city, new university? Meet people who like the same things you do.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Heart, t: 'Dating, at your pace', d: 'If you are open to romance, say so. No pressure, no games, only people who chose to be here.', color: 'bg-rose-50 text-rose-600' },
];

const STEPS = [
  { icon: UserPlus, t: 'Create your profile', d: 'Sign up with Google or email, confirm it is really you, then add photos, interests and what you are looking for.' },
  { icon: Sparkles, t: 'Discover people', d: 'Browse students by course, university and interests. You will see shared interests and a friendly compatibility score.' },
  { icon: MessageCircle, t: 'Send a gentle request', d: 'Add a short note, like "Studying in the library today, join me?". They accept when it feels right.' },
  { icon: Smile, t: 'Say hi on WhatsApp', d: 'Only after both of you agree, your WhatsApp numbers unlock. Then talk on the app you already use.' },
];

const SAFETY = [
  { icon: Mail, t: 'Email verification', d: 'Every email account is confirmed with a one-time code. Fewer fake profiles, more real people.' },
  { icon: EyeOff, t: 'Hide anytime', d: 'Pause your profile with one switch. People you are already connected with can still reach you.' },
  { icon: ShieldCheck, t: 'Block and report', d: 'One tap and they are gone from your world. Reports also block automatically.' },
  { icon: BadgeCheck, t: 'Verified student badge', d: 'Use your university email to show a badge that tells others you are a real student.' },
  { icon: Clock, t: 'Anti-spam limits', d: 'A daily request limit keeps conversations meaningful instead of mass-messaging.' },
  { icon: Lock, t: '18+ only', d: 'Everyone confirms they are an adult student before joining.' },
];

const FAQ = [
  ['Is it only a dating app?', `No. ${BRAND.name} is about meeting people on campus. Some students look for study partners or friends, others for a relationship. You choose what you are open to and only connect with people who agree.`],
  ['Who can join?', 'University students aged 18 or older. Using your university email earns a "Verified student" badge.'],
  ['Is my phone number public?', 'Never. Your WhatsApp number is stored privately and shown only to a person whose request you accept (or who accepts yours), and hidden again if you block or remove them.'],
  ['What if someone is not interested?', 'Nothing awkward happens. People can simply ignore or decline, and you are not shown a "rejected" label. Life goes on, and you can connect with someone else.'],
  ['Is it free?', 'Yes. It is a student project built to make campus life friendlier.'],
  ['Which universities are supported?', 'Any university. You enter your university and course, and filters help you find people nearby. More local features are coming.'],
];

/* ------------------------------------------------------------------ small building blocks */
const Section = ({ id, className = '', children }) => (
  <section id={id} className={`scroll-mt-20 px-4 py-16 sm:py-20 ${className}`}><div className="mx-auto max-w-6xl">{children}</div></section>
);
const Heading = ({ kicker, title, text, center = true }) => (
  <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
    {kicker && <p className="text-sm font-bold uppercase tracking-widest text-brand-600">{kicker}</p>}
    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
    {text && <p className="mt-3 text-lg text-slate-500">{text}</p>}
  </div>
);
const Soon = () => <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Coming soon</span>;

/* ------------------------------------------------------------------ page */
export default function Landing() {
  return (
    <div className="bg-white">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`} className="hover:text-brand-600">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-ghost">Log in</Link>
            <Link to="/register" className="btn-primary hidden sm:inline-flex">Join free</Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-heart-500 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur"><BadgeCheck className="h-4 w-4" /> Made by students, for students</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">Your campus is full of people <span className="text-pink-200">you haven't met yet.</span></h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{BRAND.name} helps verified university students find study buddies, language partners, friends, and sometimes something more, without awkward cold messages or handing out their phone number.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn bg-white !px-6 !py-3 !text-base text-brand-700 hover:bg-slate-100">Join {BRAND.name} <ArrowRight className="h-4 w-4" /></Link>
              <a href="#how" className="btn border border-white/40 !px-6 !py-3 !text-base text-white hover:bg-white/10">See how it works</a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
              {['Students only', 'Your number stays private', 'Free, 18+'].map((t) => <li key={t} className="flex items-center gap-1.5"><Check className="h-4 w-4" /> {t}</li>)}
            </ul>
          </div>

          {/* illustrative mock-up (sample content) */}
          <div className="relative mx-auto hidden w-full max-w-sm md:block">
            <div className="rotate-2 rounded-3xl bg-white p-4 text-slate-800 shadow-2xl">
              <div className="flex aspect-[4/3] items-end rounded-2xl bg-gradient-to-br from-brand-200 via-brand-100 to-heart-100 p-4">
                <div>
                  <p className="flex items-center gap-1.5 text-lg font-bold">Lena, 21 <BadgeCheck className="h-5 w-5 text-sky-500" /></p>
                  <p className="text-xs text-slate-600">Psychology · Year 2 · Erasmus</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5"><span className="chip">☕ Coffee &amp; languages</span><span className="chip">Hiking</span><span className="chip">Podcasts</span></div>
              <div className="mt-3 rounded-2xl rounded-bl-sm bg-slate-100 p-3 text-sm"><span className="mr-1">📍</span>Studying at the central library today. Want to join me?</div>
              <button className="btn-heart mt-3 w-full" tabIndex={-1}>Send request</button>
            </div>
            <div className="absolute -left-8 top-8 flex -rotate-3 items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow-xl"><MessageCircle className="h-4 w-4" /> WhatsApp unlocked 🎉</div>
            <div className="absolute -right-6 bottom-24 rotate-3 rounded-2xl bg-heart-500 px-3 py-2 text-xs font-bold shadow-xl">92% match</div>
            <div className="absolute -bottom-4 left-6 flex -rotate-2 items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2 text-xs font-semibold shadow-xl"><Lock className="h-4 w-4" /> Number hidden until you accept</div>
          </div>
        </div>
      </section>

      {/* quick facts */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {FACTS.map(({ icon: I, big, small }) => (
            <div key={small} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm"><I className="h-5 w-5" /></span>
              <div><p className="text-2xl font-extrabold leading-none text-slate-900">{big}</p><p className="mt-1 text-xs text-slate-500">{small}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* problem */}
      <Section>
        <Heading kicker="Why we built it" title="Campus should feel smaller, not lonelier" text="Meeting people at university sounds easy. In reality, it often is not." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.t} className="card p-7"><div className="text-4xl">{p.emoji}</div><h3 className="mt-4 text-lg font-bold text-slate-900">{p.t}</h3><p className="mt-2 text-slate-500">{p.d}</p></div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-slate-700">{BRAND.name} gives you a friendly, low-pressure way to say <span className="text-brand-600">"hi, I'd like to get to know you"</span>, and gives the other person full control over the answer.</p>
      </Section>

      {/* ways to connect */}
      <Section id="ways" className="bg-slate-50">
        <Heading kicker="Ways to connect" title="One app, many kinds of connection" text="Tell people what you are open to. Everyone on the app has chosen to be here to meet someone." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WAYS.map(({ icon: I, t, d, color, soon }) => (
            <div key={t} className="card relative p-6 transition hover:-translate-y-1 hover:shadow-xl">
              {soon && <div className="absolute right-4 top-4"><Soon /></div>}
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}><I className="h-6 w-6" /></span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{t}</h3><p className="mt-2 text-sm text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* how it works */}
      <Section id="how">
        <Heading kicker="How it works" title="From hello to chatting in four steps" />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: I, t, d }, i) => (
            <div key={t} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-heart-500 text-white shadow-lg"><I className="h-6 w-6" /></span>
                <span className="text-5xl font-extrabold text-slate-100">{i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{t}</h3><p className="mt-2 text-sm text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* privacy */}
      <Section id="privacy" className="bg-gradient-to-br from-slate-900 to-brand-900 text-white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-pink-300">Privacy by design</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Your number is yours. Share it when you decide.</h2>
            <p className="mt-4 text-lg text-white/75">Most apps ask you to hand over contact details first. We flip it: your WhatsApp number stays hidden, and only unlocks when two people both say yes.</p>
            <ul className="mt-6 space-y-3 text-white/85">
              {['Never shown on your profile or in search', 'The sender never sees it, the app sends the heads-up for them', 'Hidden again if you block or remove someone'].map((t) => (
                <li key={t} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {[
              { n: '1', t: 'You send a request', d: 'A note and a smile. Their number stays hidden.', icon: MessageCircle, tone: 'bg-white/10' },
              { n: '2', t: 'They accept (or not)', d: 'Their choice, on their time. No pressure either way.', icon: Smile, tone: 'bg-white/10' },
              { n: '3', t: 'Numbers unlock for both', d: 'Now you can chat on WhatsApp, safely and by mutual choice.', icon: Lock, tone: 'bg-emerald-500/20 ring-1 ring-emerald-400/40' },
            ].map(({ n, t, d, icon: I, tone }) => (
              <div key={n} className={`flex items-center gap-4 rounded-2xl p-5 ${tone}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lg font-extrabold text-brand-700">{n}</span>
                <div className="flex-1"><p className="font-bold">{t}</p><p className="text-sm text-white/70">{d}</p></div>
                <I className="h-6 w-6 text-white/60" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* low pressure */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="card mx-auto max-w-md space-y-3 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">New request</p>
              <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-heart-500 font-bold text-white">M</span>
                <div><p className="font-bold">Marco, 23</p><p className="text-xs text-slate-500">Computer Science · Year 3</p></div></div>
              <div className="rounded-2xl rounded-tl-sm bg-slate-100 p-3 text-sm">☕ Coffee after the lecture at the campus café? I'm there until 4.</div>
              <div className="flex gap-2"><button className="btn-primary flex-1" tabIndex={-1}>Accept</button><button className="btn-ghost flex-1" tabIndex={-1}>Not now</button></div>
              <p className="text-center text-xs text-slate-400">No "rejected" label is ever shown to the sender.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Heading center={false} kicker="Low pressure" title="Friendly requests. Gentle answers." text="Breaking the ice should not be scary. Requests are short, casual and easy to decline, so both people stay comfortable." />
            <ul className="mt-6 space-y-4 text-slate-600">
              {[
                ['Add a short icebreaker', 'Tell them where you are studying or what you would like to do.'],
                ['Easy to say "not now"', 'Declining is one tap, and the sender is never shown a harsh rejection.'],
                ['Quality over quantity', 'A daily limit helps you connect thoughtfully.'],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"><Check className="h-4 w-4" /></span><div><p className="font-semibold text-slate-900">{t}</p><p className="text-sm">{d}</p></div></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* europe / campuses */}
      <Section className="bg-slate-50">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Heading center={false} kicker="For every campus" title="New city? New country? Start with a friendly face." text="International, Erasmus and exchange students often arrive knowing no one. Filter by university, course and interests to find people in your faculty, or at nearby universities." />
            <div className="mt-5 flex flex-wrap gap-2">
              {['Freshers', 'Erasmus & exchange', 'International students', 'Master\u2019s', 'PhD', 'Local students'].map((t) => <span key={t} className="chip !px-3 !py-1.5 !text-sm">{t}</span>)}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-5"><Globe2 className="h-7 w-7 text-brand-600" /><h3 className="mt-3 font-bold text-slate-900">Any university</h3><p className="mt-1 text-sm text-slate-500">Type your university and course. No lists to wait for.</p></div>
            <div className="card relative p-5"><div className="absolute right-3 top-3"><Soon /></div><MapPin className="h-7 w-7 text-heart-500" /><h3 className="mt-3 font-bold text-slate-900">Nearby campuses</h3><p className="mt-1 text-sm text-slate-500">Discover students from other universities in the same city.</p></div>
          </div>
        </div>
      </Section>

      {/* safety */}
      <Section id="safety">
        <Heading kicker="Trust & safety" title="Built so you can relax" text="Meeting new people should feel good. These protections are part of the product, not an afterthought." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY.map(({ icon: I, t, d }) => (
            <div key={t} className="card flex gap-4 p-6"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><I className="h-5 w-5" /></span>
              <div><h3 className="font-bold text-slate-900">{t}</h3><p className="mt-1 text-sm text-slate-500">{d}</p></div></div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">Tip: meet in public places first and tell a friend where you are going.</p>
      </Section>

      {/* faq */}
      <Section id="faq" className="bg-slate-50">
        <Heading kicker="FAQ" title="Questions students ask" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="card group p-5 open:ring-2 open:ring-brand-100">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">{q}<ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" /></summary>
              <p className="mt-3 text-slate-500">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* final cta */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-heart-500 px-4 py-20 text-center text-white">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Someone on your campus is hoping to meet someone like you.</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">Create your profile in about three minutes. It's free.</p>
        <Link to="/register" className="btn mt-8 bg-white !px-8 !py-3.5 !text-base text-brand-700 hover:bg-slate-100">Join {BRAND.name} <ArrowRight className="h-4 w-4" /></Link>
        <p className="mt-4 text-sm text-white/70">Already a member? <Link to="/login" className="font-semibold underline">Log in</Link></p>
      </section>

      <footer className="bg-slate-900 px-4 py-10 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo light />
          <p className="text-center text-xs">© {new Date().getFullYear()} {BRAND.name}. Made by students, for students. Be kind. Be safe.</p>
        </div>
      </footer>
    </div>
  );
}
