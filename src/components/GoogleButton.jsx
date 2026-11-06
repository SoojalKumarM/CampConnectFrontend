import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../api/services';
import { errMsg } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { GOOGLE_CLIENT_ID } from '../constants';

/** Works for BOTH sign-in and sign-up: the backend creates the account on first Google login. */
export default function GoogleButton({ text = 'continue_with' }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
        <b>Google Client ID not found in the frontend.</b> Check: (1) the file is named exactly <code>.env</code> (not <code>.env.txt</code>) and sits in the <code>frontend</code> folder next to <code>package.json</code>;
        (2) the line is <code>VITE_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com</code> (no quotes, no spaces); (3) you stopped and restarted <code>npm run dev</code>.
      </div>
    );
  }

  const onSuccess = async (res) => {
    try {
      const data = await authApi.google(res.credential);
      login(data.token, data.user);
      navigate(data.user.profileComplete ? '/home' : '/onboarding', { replace: true });
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin onSuccess={onSuccess} onError={() => toast.error('Google sign-in was cancelled or blocked. Check popup settings and try again.')}
        text={text} shape="pill" theme="outline" size="large" width="320" />
    </div>
  );
}
