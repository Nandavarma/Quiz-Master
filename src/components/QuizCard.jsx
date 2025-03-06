import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./ProgressBar";
import QuestionTypes from "./QuestionTypes";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, onComplete }) => {
  const navigate = useNavigate();
  const { submitAnswer } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quiz.questions.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answer) => {
    if (showResult) return;
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  };

  const checkAnswer = () => {
    const question = quiz.questions[currentQuestion];
    const userAnswer = selectedAnswers[currentQuestion];
    console.log("Checking answer:", {
      questionIndex: currentQuestion,
      userAnswer,
      type: typeof userAnswer,
    });

    // Handle null answers
    if (userAnswer === null || userAnswer === undefined) {
      console.error("No answer selected");
      return;
    }

    // Convert to number for strict comparison
    const correctAnswers = question.correctAnswers.map(Number);

    let isCorrect = false;

    switch (question.type) {
      case "multiple":
        const userAnswers = Array.isArray(userAnswer)
          ? userAnswer.map(Number).sort()
          : [Number(userAnswer)].sort();
        isCorrect =
          JSON.stringify(userAnswers) === JSON.stringify(correctAnswers.sort());
        break;

      case "single":
      case "boolean":
        const numericAnswer = Number(userAnswer);
        isCorrect = correctAnswers.includes(numericAnswer);
        break;
      default:
        isCorrect = correctAnswers.some((ca) => ca === Number(userAnswer));
        break;
    }

    console.log("Validation:", {
      userAnswer,
      correctAnswers,
      isCorrect,
      type: typeof userAnswer,
    });

    setIsCorrect(isCorrect);
    setShowResult(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      submitAnswer(quiz.id, currentQuestion, userAnswer);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowResult(false);
    } else {
      onComplete(score);
      navigate("/");
    }
  };

  if (!quiz?.questions?.length) return <div>Error loading quiz</div>;

  return (
    <div className="max-w-2xl w-full mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-600 dark:text-slate-300">
          Score: {score}/{quiz.questions.length}
        </span>
        <span className="text-slate-600 dark:text-slate-300">
          Question {currentQuestion + 1}/{quiz.questions.length}
        </span>
      </div>

      <ProgressBar progress={(currentQuestion + 1) / quiz.questions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="space-y-6 mt-6"
        >
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
            {quiz.questions[currentQuestion].question}
          </h3>

          <QuestionTypes
            question={quiz.questions[currentQuestion]}
            selected={
              selectedAnswers[currentQuestion] ??
              (quiz.questions[currentQuestion].type === "multiple" ? [] : null)
            }
            onSelect={handleAnswer}
            showResult={showResult}
          />

          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg ${
                isCorrect
                  ? "bg-emerald-100 dark:bg-emerald-800 border-2 border-emerald-300 dark:border-emerald-600"
                  : "bg-rose-100 dark:bg-rose-800 border-2 border-rose-300 dark:border-rose-600"
              }`}
            >
              <p
                className={
                  isCorrect
                    ? "text-emerald-700 dark:text-emerald-200"
                    : "text-rose-700 dark:text-rose-200"
                }
              >
                {isCorrect
                  ? "Correct! 🎉"
                  : `Incorrect. ${quiz.questions[currentQuestion].explanation}`}
              </p>
            </motion.div>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (!showResult) {
                  checkAnswer();
                } else {
                  handleNext();
                }
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={
                selectedAnswers[currentQuestion] === null ||
                selectedAnswers[currentQuestion] === undefined
              }
            >
              {showResult
                ? currentQuestion < quiz.questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"
                : "Submit Answer"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizCard;
