import { initials } from '../utils';
export default function Avatar({ src, name, size = 'h-12 w-12', text = 'text-base' }) {
  return src ? (
    <img src={src} alt={name} className={`${size} shrink-0 rounded-full object-cover ring-2 ring-white`} />
  ) : (
    <div className={`${size} ${text} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-heart-500 font-bold text-white ring-2 ring-white`}>
      {initials(name)}
    </div>
  );
}
