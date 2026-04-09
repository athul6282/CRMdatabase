const Navbar = ({ user, onLogout }) => {
  return (
    <header className="rounded-[28px] border border-white/10 bg-slate-900/70 px-5 py-4 shadow-xl shadow-slate-950/30 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">CRM Dashboard</p>
          <h1 className="mt-2 text-2xl font-bold text-white">Welcome back, {user?.name || 'User'}</h1>
          <p className="mt-1 text-sm text-slate-300">Track your leads, customer activity, and follow-up notes in one place.</p>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
          onClick={onLogout}
          type="button"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
