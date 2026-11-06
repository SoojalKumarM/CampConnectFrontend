import { useState } from 'react';
import { COUNTRY_CODES } from '../constants';

const detect = (v) => [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length).find((c) => v?.startsWith(c.code));

/** value / onChange use the full E.164 format, e.g. +919876543210 */
export default function PhoneField({ value, onChange, id = 'wa' }) {
  const init = detect(value);
  const [code, setCode] = useState(init?.code || '+91');
  const [num, setNum] = useState(init ? value.slice(init.code.length) : '');
  const emit = (c, n) => {
    const digits = n.replace(/\D/g, '').replace(/^0+/, '');
    onChange(digits ? c + digits : '');
  };
  return (
    <div className="flex gap-2">
      <select className="input !w-28 shrink-0" value={code} onChange={(e) => { setCode(e.target.value); emit(e.target.value, num); }} aria-label="Country code">
        {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
      </select>
      <input id={id} className="input" inputMode="tel" placeholder="98765 43210" value={num}
        onChange={(e) => { setNum(e.target.value); emit(code, e.target.value); }} />
    </div>
  );
}
