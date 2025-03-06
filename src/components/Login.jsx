import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useUser();
  const { currentUser } = useUser();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === "admin" ? "/admin" : "/");
    }
  }, [currentUser, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = login(credentials);
    if (user) {
      // Redirect based on user role
      navigate(user.role === "admin" ? "/admin" : "/");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg bg-slate-50 dark:bg-slate-600 border-slate-200 dark:border-slate-500 focus:ring-indigo-500 focus:border-indigo-500"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-lg bg-slate-50 dark:bg-slate-600 border-slate-200 dark:border-slate-500 focus:ring-indigo-500 focus:border-indigo-500"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </motion.div>
  );
}
