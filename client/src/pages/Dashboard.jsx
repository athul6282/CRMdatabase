import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import api from '../services/api';
import { clearStoredAuth, getStoredUser } from '../utils/auth';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'Lead',
  notes: '',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoadingId, setDeleteLoadingId] = useState('');

  const loadCustomers = async () => {
    try {
      setPageLoading(true);
      const [customerResponse, userResponse] = await Promise.all([api.get('/customers'), api.get('/auth/me')]);
      setCustomers(customerResponse.data.customers);
      setUser(userResponse.data.user);
      setError('');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load dashboard data.');
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId('');
    setError('');
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return 'Customer name is required.';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return 'Please enter a valid customer email address.';
    }

    if (!form.phone.trim()) {
      return 'Phone number is required.';
    }

    if (form.notes.length > 300) {
      return 'Notes cannot exceed 300 characters.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (editingId) {
        await api.put(`/customers/${editingId}`, form);
      } else {
        await api.post('/customers', form);
      }

      resetForm();
      await loadCustomers();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save customer data.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer._id);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      status: customer.status,
      notes: customer.notes,
    });
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoadingId(id);
      setError('');
      await api.delete(`/customers/${id}`);
      setCustomers((previous) => previous.filter((customer) => customer._id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete customer.');
    } finally {
      setDeleteLoadingId('');
    }
  };

  const handleLogout = () => {
    clearStoredAuth();
    navigate('/login');
  };

  const activeCustomers = customers.filter((customer) => customer.status === 'Active').length;
  const leadCustomers = customers.filter((customer) => customer.status === 'Lead').length;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Navbar onLogout={handleLogout} user={user} />

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard accent="bg-cyan-400/15 text-cyan-200" label="Total Customers" value={customers.length} />
          <StatCard accent="bg-emerald-400/15 text-emerald-200" label="Active Customers" value={activeCustomers} />
          <StatCard accent="bg-amber-400/15 text-amber-200" label="Lead Customers" value={leadCustomers} />
        </section>

        {error && !loading && !pageLoading && (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <CustomerForm
            error={error}
            form={form}
            isEditing={Boolean(editingId)}
            loading={loading}
            onCancel={resetForm}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <section className="rounded-[28px] border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/20 backdrop-blur">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Customer Records</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Manage Your CRM Data</h2>
              <p className="mt-2 text-sm text-slate-300">Review all saved customer entries, then edit or remove them anytime.</p>
            </div>

            {pageLoading ? (
              <div className="rounded-[24px] border border-white/10 bg-slate-950/60 px-5 py-8 text-center text-slate-300">
                Loading customer data...
              </div>
            ) : (
              <CustomerList customers={customers} deletingId={deleteLoadingId} onDelete={handleDelete} onEdit={handleEdit} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
