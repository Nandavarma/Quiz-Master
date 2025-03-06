// Admin.jsx
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import UserScores from "../components/UserScores";
import {
  ChartPieIcon,
  UsersIcon,
  TrophyIcon,
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Admin() {
  const { users } = useUser();
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <UsersIcon className="w-8 h-8" />,
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Quizzes Completed",
      value: users.reduce((acc, user) => acc + (user.scores?.length || 0), 0),
      icon: <ChartPieIcon className="w-8 h-8" />,
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Avg. Score",
      value:
        users.length > 0
          ? (
              users.reduce(
                (acc, user) => acc + (user.scores?.[0]?.score || 0),
                0
              ) / users.length
            ).toFixed(1)
          : 0,
      icon: <TrophyIcon className="w-8 h-8" />,
      color: "bg-green-100 dark:bg-green-900",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex items-center gap-4">
            <span className="text-slate-600 dark:text-slate-300">
              Admin Dashboard
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} p-6 rounded-xl shadow-lg dark:shadow-none`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard Section */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
              <TrophyIcon className="w-5 h-5 inline-block mr-2" />
              Leaderboard
            </h3>
            <Leaderboard scores={users.flatMap((u) => u.scores || [])} />
          </div>

          {/* User Scores Section */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
              <UsersIcon className="w-5 h-5 inline-block mr-2" />
              User Performance
            </h3>
            <UserScores users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}
