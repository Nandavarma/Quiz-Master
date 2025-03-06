// src/components/Navigation.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; // Import your existing toggle

const Navigation = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-12">
      <Link
        to="/"
        className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
      >
        QuizMaster
      </Link>

      <div className="flex items-center gap-4">
        {/* Add Theme Toggle Here */}
        <ThemeToggle />

        {currentUser ? (
          <>
            <span className="text-slate-600 dark:text-slate-300">
              Hi, {currentUser.name}
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
