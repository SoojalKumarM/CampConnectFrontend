import { Loader2 } from 'lucide-react';
export default function Spinner({ full = false, label }) {
  const inner = (
    <div className="flex flex-col items-center gap-2 text-brand-600">
      <Loader2 className="h-7 w-7 animate-spin" />
      {label && <p className="text-sm text-slate-500">{label}</p>}
    </div>
  );
  return full ? <div className="flex min-h-screen items-center justify-center">{inner}</div> : <div className="flex justify-center py-12">{inner}</div>;
}
