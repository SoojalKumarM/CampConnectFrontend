import { Link } from 'react-router-dom';
import { BadgeCheck, GraduationCap, Sparkles } from 'lucide-react';
import ConnectButton from './ConnectButton';
import { lookingForLabel } from '../constants';

export default function ProfileCard({ profile, onChanged }) {
  const photo = profile.photos?.[0];
  return (
    <div className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl">
      <Link to={`/profile/${profile.userId}`} className="relative block aspect-[4/5] overflow-hidden bg-slate-100">
        {photo ? <img src={photo} alt={profile.fullName} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          : <div className="flex h-full items-center justify-center text-5xl font-bold text-slate-300">{profile.fullName[0]}</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        {profile.compatibility != null && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-brand-700 shadow">
            <Sparkles className="h-3.5 w-3.5" /> {profile.compatibility}% match
          </span>
        )}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="flex items-center gap-1.5 text-lg font-bold">
            {profile.fullName.split(' ')[0]}, {profile.age}
            {profile.verifiedStudent && <BadgeCheck className="h-5 w-5 text-sky-300" title="Verified student" />}
          </h3>
          <p className="flex items-center gap-1 text-xs text-white/85"><GraduationCap className="h-3.5 w-3.5" /> {profile.department} · Year {profile.yearOfStudy}</p>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <p className="truncate text-xs font-medium text-slate-500">{profile.university} · {lookingForLabel(profile.lookingFor)}</p>
        <div className="flex min-h-[26px] flex-wrap gap-1.5">
          {(profile.sharedInterests?.length ? profile.sharedInterests : profile.interests).slice(0, 3).map((i) => (
            <span key={i} className={profile.sharedInterests?.includes(i) ? 'chip !bg-heart-50 !text-heart-600' : 'chip'}>{i}</span>
          ))}
        </div>
        <ConnectButton profile={profile} onChanged={onChanged} />
      </div>
    </div>
  );
}
