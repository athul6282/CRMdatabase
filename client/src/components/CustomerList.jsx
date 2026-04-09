const badgeClasses = {
  Lead: 'bg-amber-400/15 text-amber-200 border-amber-400/20',
  Active: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/20',
  Inactive: 'bg-slate-400/15 text-slate-200 border-slate-400/20',
};

const CustomerList = ({ customers, onEdit, onDelete, deletingId }) => {
  if (!customers.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-white/15 bg-slate-900/50 p-8 text-center text-slate-300">
        No customers added yet. Use the form to create your first record.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {customers.map((customer) => (
        <article
          className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20 backdrop-blur"
          key={customer._id}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-white">{customer.name}</h3>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClasses[customer.status]}`}>
                  {customer.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{customer.email}</p>
              <p className="mt-1 text-sm text-slate-300">{customer.phone}</p>
              <p className="mt-1 text-sm text-slate-300">{customer.company || 'No company added'}</p>
            </div>

            <div className="flex gap-3">
              <button
                className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                onClick={() => onEdit(customer)}
                type="button"
              >
                Edit
              </button>
              <button
                className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed"
                disabled={deletingId === customer._id}
                onClick={() => onDelete(customer._id)}
                type="button"
              >
                {deletingId === customer._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-300">
            {customer.notes || 'No notes added yet.'}
          </div>
        </article>
      ))}
    </div>
  );
};

export default CustomerList;
