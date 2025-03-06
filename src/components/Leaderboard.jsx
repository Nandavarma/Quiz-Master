const Leaderboard = ({ scores }) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
    <table className="w-full">
      <thead className="bg-slate-50 dark:bg-slate-800">
        <tr>
          <th className="px-6 py-3 text-left">User</th>
          <th className="px-6 py-3 text-left">Score</th>
          <th className="px-6 py-3 text-left">Time</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
        {scores.map((score, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <td className="px-6 py-4">{score.user}</td>
            <td className="px-6 py-4">{score.score}</td>
            <td className="px-6 py-4">{score.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default Leaderboard;
