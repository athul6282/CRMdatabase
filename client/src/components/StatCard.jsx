const StatCard = ({ label, value, accent }) => {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5 backdrop-blur">
      <p className="text-sm text-slate-300">{label}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-3xl font-bold text-white">{value}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>Live</span>
      </div>
    </div>
  );
};

export default StatCard;
