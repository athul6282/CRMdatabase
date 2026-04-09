import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import api from '../services/api';
import { setStoredAuth } from '../utils/auth';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    if (form.name.trim().length < 2) {
      return 'Name must be at least 2 characters long.';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return 'Please enter a valid email address.';
    }

    if (form.password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setStoredAuth(data);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      alternateLabel="Sign in"
      alternateLink="/login"
      alternateText="Already have an account?"
      subtitle="Create an account to manage your customer records."
      title="Register"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</div>}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Full Name</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            name="name"
            onChange={handleChange}
            placeholder="Enter your full name"
            value={form.name}
          />
        </label>

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
            placeholder="Minimum 6 characters"
            type="password"
            value={form.password}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Confirm Password</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Repeat your password"
            type="password"
            value={form.confirmPassword}
          />
        </label>

        <button
          className="w-full rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/70"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-xs leading-6 text-slate-400">
        By signing up, you can securely access customer records and manage your CRM workflow from the dashboard.
      </p>
    </AuthLayout>
  );
};

export default Register;
