// src/components/QuizList.jsx
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";

const QuizList = ({ quizzes }) => {
  const { startQuiz } = useQuiz();
  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    startQuiz(quizId);
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {quizzes.map((quiz, i) => (
        <motion.div
          key={quiz.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/20"
        >
          <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">
            {quiz.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {quiz.description}
          </p>
          <button
            onClick={() => handleStartQuiz(quiz.id)}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default QuizList;
