import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Compass, Search, SlidersHorizontal } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import EmptyState from '../components/EmptyState';
import Spinner from '../components/Spinner';
import { discoverApi } from '../api/services';
import { errMsg } from '../api/client';
import { GENDERS, INTERESTS } from '../constants';
import toast from 'react-hot-toast';

const empty = { q: '', gender: '', university: '', department: '', year: '', interest: '' };

export default function Discover() {
  const { refreshSummary } = useOutletContext();
  const [filters, setFilters] = useState(empty);
  const [applied, setApplied] = useState(empty);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const load = useCallback(async (pg, f, append) => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(f).filter(([, v]) => v !== ''));
      const res = await discoverApi.list({ ...params, page: pg });
      setItems((prev) => (append ? [...prev, ...res.content] : res.content));
      setPage(res.page); setTotalPages(res.totalPages); setTotal(res.totalElements);
    } catch (e) { toast.error(errMsg(e)); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(0, applied, false); }, [applied, load]);

  const apply = (e) => { e?.preventDefault(); setApplied(filters); };
  const reset = () => { setFilters(empty); setApplied(empty); };
  const update = (p) => { setItems((l) => l.map((x) => (x.userId === p.userId ? p : x))); refreshSummary(); };
  const set = (k) => (e) => setFilters({ ...filters, [k]: e.target.value });

  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Discover</h1><p className="text-sm text-slate-500">{total} student{total === 1 ? '' : 's'} to meet</p></div>
        <button className="btn-ghost md:hidden" onClick={() => setShowFilters((s) => !s)}><SlidersHorizontal className="h-4 w-4" /> Filters</button>
      </div>

      <form onSubmit={apply} className={`card mb-6 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 ${showFilters ? '' : 'hidden md:grid'}`}>
        <div className="relative sm:col-span-2"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input className="input !pl-9" placeholder="Search by name or bio…" value={filters.q} onChange={set('q')} /></div>
        <input className="input" placeholder="University" value={filters.university} onChange={set('university')} />
        <input className="input" placeholder="Department / course" value={filters.department} onChange={set('department')} />
        <select className="input" value={filters.year} onChange={set('year')}><option value="">Any year</option>{[1, 2, 3, 4, 5, 6].map((y) => <option key={y} value={y}>Year {y}</option>)}</select>
        <select className="input" value={filters.gender} onChange={set('gender')}><option value="">Any gender</option>{GENDERS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}</select>
        <select className="input" value={filters.interest} onChange={set('interest')}><option value="">Any interest</option>{INTERESTS.map((i) => <option key={i}>{i}</option>)}</select>
        <div className="flex gap-2"><button className="btn-primary flex-1">Apply</button><button type="button" className="btn-ghost" onClick={reset}>Reset</button></div>
      </form>

      {loading && items.length === 0 ? <Spinner /> : items.length === 0 ? (
        <EmptyState icon={Compass} title="No one matches these filters" text="Try widening your search — new students join every day." action={<button className="btn-primary" onClick={reset}>Clear filters</button>} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => <ProfileCard key={p.userId} profile={p} onChanged={update} />)}
          </div>
          {page + 1 < totalPages && (
            <div className="mt-8 text-center"><button className="btn-ghost" disabled={loading} onClick={() => load(page + 1, applied, true)}>{loading ? 'Loading…' : 'Load more'}</button></div>
          )}
        </>
      )}
    </div>
  );
}
