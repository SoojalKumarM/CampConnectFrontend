import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Logo />
      <h1 className="text-6xl font-extrabold text-brand-600">404</h1>
      <p className="text-slate-500">That page doesn't exist.</p>
      <Link to="/" className="btn-primary">Go home</Link>
    </div>
  );
}
