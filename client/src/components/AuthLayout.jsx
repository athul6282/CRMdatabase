import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, alternateText, alternateLink, alternateLabel, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/60 shadow-2xl shadow-slate-950/40 backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden min-h-full flex-col justify-between bg-[linear-gradient(135deg,rgba(46,84,144,0.95),rgba(15,23,42,0.7))] p-10 md:flex">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-sm font-semibold tracking-wide text-cyan-100">
              PulseCRM
            </span>
            <h1 className="mt-6 max-w-md text-4xl font-extrabold leading-tight text-white">
              Turn every customer conversation into your next growth opportunity.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-200">
              Give your team a faster way to capture leads, follow up with confidence, and keep every account detail organized in one modern workspace.
            </p>
          </div>

          <div className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Smarter Sales Pipeline</p>
              <p className="mt-2">Track fresh leads, active clients, and quiet accounts without losing context between follow-ups.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Built For Fast Teams</p>
              <p className="mt-2">Update contact details, meeting notes, and account status in seconds from a clean shared dashboard.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/60 p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/80">Customer CRM</p>
              <h2 className="mt-3 text-3xl font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
            </div>

            {children}

            <p className="mt-6 text-sm text-slate-300">
              {alternateText}{' '}
              <Link className="font-semibold text-cyan-300 transition hover:text-cyan-200" to={alternateLink}>
                {alternateLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
