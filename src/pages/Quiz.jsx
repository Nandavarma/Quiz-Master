import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { useUser } from "../context/UserContext";
import QuizCard from "../components/QuizCard";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Quiz() {
  const { id } = useParams();
  const { currentQuiz, startQuiz, completeQuiz } = useQuiz();
  const { currentUser, updateUserScore } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        await startQuiz(id);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz");
        console.error("Quiz loading error:", err);
        navigate("/");
      }
    };

    loadQuiz();
  }, [id, startQuiz, navigate]);

  const handleComplete = (score) => {
    try {
      if (currentUser) {
        updateUserScore(id, score);
      }
      completeQuiz(id, score);
    } finally {
      navigate("/", { replace: true });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  if (loading || !currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
        <div className="text-slate-600 dark:text-slate-300">
          Loading quiz...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <ErrorBoundary>
        <QuizCard quiz={currentQuiz} onComplete={handleComplete} />
      </ErrorBoundary>
    </div>
  );
}
