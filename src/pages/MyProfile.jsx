import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { AboutFields, BasicsFields, PhotoManager, emptyForm, toForm, toPayload } from '../components/ProfileEditor';
import { profileApi } from '../api/services';
import { errMsg } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function MyProfile() {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [photos, setPhotos] = useState([]);
  const [hasWhatsapp, setHasWhatsapp] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const set = (p) => setForm((f) => ({ ...f, ...p }));

  useEffect(() => {
    profileApi.mine().then((p) => { setForm(toForm(p)); setPhotos(p.photos); setHasWhatsapp(!!p.whatsappNumber); })
      .catch((e) => toast.error(errMsg(e))).finally(() => setLoading(false));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (form.interests.length < 3) return toast.error('Pick at least 3 interests');
    setBusy(true);
    try { const p = await profileApi.update(toPayload(form)); setForm(toForm(p)); await refresh(); toast.success('Profile updated'); }
    catch (err) { toast.error(errMsg(err)); } finally { setBusy(false); }
  };

  const onPhotos = async (list) => { setPhotos(list); refresh(); };

  if (loading) return <Spinner />;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-slate-900">My profile</h1>
          {user.verifiedStudent && <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-sky-600"><BadgeCheck className="h-4 w-4" /> Verified student</p>}</div>
        <Link to={`/profile/${user.id}`} className="btn-ghost"><Eye className="h-4 w-4" /> Preview</Link>
      </div>
      <form onSubmit={save} className="space-y-6">
        <section className="card p-6"><h2 className="mb-4 font-bold">Photos</h2><PhotoManager photos={photos} onChange={onPhotos} /></section>
        <section className="card p-6"><h2 className="mb-4 font-bold">Basics</h2><BasicsFields form={form} set={set} hasWhatsapp={hasWhatsapp} /></section>
        <section className="card p-6"><h2 className="mb-4 font-bold">About you</h2><AboutFields form={form} set={set} /></section>
        <button className="btn-primary w-full !py-3" disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button>
      </form>
    </div>
  );
}
