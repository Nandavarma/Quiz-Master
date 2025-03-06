import { motion } from "framer-motion";

const QuestionTypes = ({ question, selected, onSelect, showResult }) => {
  const handleSelection = (index) => {
    if (showResult) return;

    switch (question.type) {
      case "multiple":
        const numericIndex = Number(index);
        const currentSelection = Array.isArray(selected)
          ? selected.map(Number)
          : [];
        const newMultiSelect = currentSelection.includes(numericIndex)
          ? currentSelection.filter((i) => i !== numericIndex)
          : [...currentSelection, numericIndex];
        onSelect(newMultiSelect.sort((a, b) => a - b));
        break;

      case "single":
      case "boolean":
      default:
        onSelect(Number(index));
        break;
    }
  };

  const isSelected = (index) => {
    if (question.type === "multiple") {
      return Array.isArray(selected) ? selected.includes(index) : false;
    }
    return selected !== null && selected === index;
  };

  const isCorrectAnswer = (index) => {
    return question.correctAnswers.includes(index);
  };

  return (
    <div className="space-y-3">
      {question.options.map((option, index) => (
        <motion.div
          key={index}
          whileHover={!showResult ? { scale: 1.02 } : {}}
          className={`p-4 rounded-lg cursor-pointer transition-all border-2
            ${
              showResult
                ? isCorrectAnswer(index)
                  ? "bg-emerald-100 dark:bg-emerald-900 border-emerald-300 dark:border-emerald-700"
                  : isSelected(index)
                  ? "bg-rose-100 dark:bg-rose-900 border-rose-300 dark:border-rose-700"
                  : "bg-slate-100 dark:bg-slate-700 border-transparent"
                : isSelected(index)
                ? "bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700"
                : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-transparent"
            }`}
          onClick={() => handleSelection(index)}
        >
          <div className="flex items-center gap-3">
            {question.type === "multiple" ? (
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center
                ${
                  isSelected(index)
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-500"
                }`}
              >
                {isSelected(index) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
            ) : question.type === "boolean" ? (
              <div className="relative w-10 h-6 rounded-full bg-slate-300 dark:bg-slate-600">
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full transition-transform
                  ${
                    isSelected(index)
                      ? "translate-x-5 bg-indigo-600"
                      : "translate-x-1 bg-white"
                  }`}
                />
              </div>
            ) : (
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  isSelected(index)
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800"
                }`}
              >
                {isSelected(index) && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            )}

            <span className="text-slate-700 dark:text-slate-200">{option}</span>

            {showResult && isCorrectAnswer(index) && (
              <span className="ml-auto text-emerald-600 dark:text-emerald-300">
                ✓
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuestionTypes;
