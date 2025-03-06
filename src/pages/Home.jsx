// src/pages/Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { useUser } from "../context/UserContext";
import Navigation from "../components/Navigation";
import QuizList from "../components/QuizList";

export default function Home() {
  const { quizzes } = useQuiz();
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (currentUser?.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <Navigation currentUser={currentUser} onLogout={logout} />
        <QuizList quizzes={quizzes} />
      </div>
    </div>
  );
}
