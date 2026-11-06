import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
export default function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-extrabold tracking-tight">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-heart-500 text-white shadow-sm">
        <Heart className="h-5 w-5" fill="currentColor" />
      </span>
      <span className={`text-lg ${light ? 'text-white' : 'text-slate-900'}`}>Campus<span className={light ? 'text-pink-200' : 'text-brand-600'}>Connect</span></span>
    </Link>
  );
}
