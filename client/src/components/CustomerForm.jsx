const statuses = ['Lead', 'Active', 'Inactive'];

const CustomerForm = ({ form, onChange, onSubmit, isEditing, loading, error, onCancel }) => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Customer Form</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{isEditing ? 'Update Customer' : 'Add New Customer'}</h2>
        </div>
        {isEditing && (
          <button
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        )}
      </div>

      {error && (
        <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      )}

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Name</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400"
            name="name"
            onChange={onChange}
            placeholder="Customer name"
            value={form.name}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400"
            name="email"
            onChange={onChange}
            placeholder="customer@example.com"
            value={form.email}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Phone</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400"
            name="phone"
            onChange={onChange}
            placeholder="+91 98765 43210"
            value={form.phone}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Company</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400"
            name="company"
            onChange={onChange}
            placeholder="Company name"
            value={form.company}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Status</span>
          <select
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition focus:border-cyan-400"
            name="status"
            onChange={onChange}
            value={form.status}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-200">Notes</span>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400"
            name="notes"
            onChange={onChange}
            placeholder="Follow-up notes"
            value={form.notes}
          />
        </label>

        <div className="md:col-span-2">
          <button
            className="w-full rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/70"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Customer' : 'Add Customer'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CustomerForm;
