const ProgressBar = ({ progress }) => (
  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
      style={{ width: `${progress * 100}%` }}
    />
  </div>
);
export default ProgressBar;
