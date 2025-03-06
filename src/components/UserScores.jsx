// UserScores.jsx
const UserScores = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        No users found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg transition-all hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {user.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {user.role} • {user.scores?.length || 0} quizzes completed
              </p>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Joined:{" "}
              {new Date(user.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-2">
            {(user.scores || []).map((score, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-md"
              >
                <span className="text-slate-700 dark:text-slate-300">
                  Quiz #{score.quizId}
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    {score.score} pts
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(score.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserScores;
