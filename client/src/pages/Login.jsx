import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import api from '../services/api';
import { setStoredAuth } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!form.password) {
      setError('Password is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/auth/login', form);
      setStoredAuth(data);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      alternateLabel="Create account"
      alternateLink="/register"
      alternateText="Need an account?"
      subtitle="Sign in to continue managing your customer database."
      title="Login"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</div>}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            value={form.email}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            type="password"
            value={form.password}
          />
        </label>

        <button
          className="w-full rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/70"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
