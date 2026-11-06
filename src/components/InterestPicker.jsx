import { INTERESTS } from '../constants';

export default function InterestPicker({ value, onChange, max = 8 }) {
  const toggle = (i) => {
    if (value.includes(i)) onChange(value.filter((x) => x !== i));
    else if (value.length < max) onChange([...value, i]);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((i) => {
          const on = value.includes(i);
          return (
            <button type="button" key={i} onClick={() => toggle(i)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${on ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'}`}>
              {i}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-slate-500">{value.length}/{max} selected (pick at least 3)</p>
    </div>
  );
}
