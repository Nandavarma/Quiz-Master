import { createContext, useContext, useState, useEffect } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [scores, setScores] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockQuizzes = [
      {
        id: "1",
        title: "Web Development Basics",
        description: "Test your fundamental web knowledge",
        questions: [
          {
            type: "single",
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "Home Tool Markup Language",
              "Hyperlinks and Text Markup Language",
              "Hyper Transfer Markup Language",
            ],
            correctAnswers: [0],
            explanation: "HTML is the standard markup language for web pages",
          },
          {
            type: "multiple",
            question: "Which are JavaScript frameworks?",
            options: ["React", "Angular", "Django", "Vue"],
            correctAnswers: [0, 1, 3],
            explanation: "React, Angular and Vue are JS frameworks",
          },
          {
            type: "boolean",
            question: "CSS is a programming language",
            options: ["True", "False"],
            correctAnswers: [1],
            explanation: "CSS can't manipulate data and logic",
          },
        ],
      },
      {
        id: "2", // Unique ID
        title: "JavaScript Fundamentals",
        description: "Test your JavaScript knowledge",
        questions: [
          {
            type: "single",
            question:
              "Which keyword is used to declare variables in JavaScript?",
            options: ["var", "let", "const", "All of the above"],
            correctAnswers: [3], // Index of correct answer
            explanation: "All three keywords can be used to declare variables",
          },
          {
            type: "multiple",
            question: "Which are JavaScript data types?",
            options: ["String", "Number", "Boolean", "Array"],
            correctAnswers: [0, 1, 2], // Indices of correct answers
            explanation: "Array is a structure, not a primitive data type",
          },
          {
            type: "boolean",
            question: "JavaScript is a statically typed language",
            options: ["True", "False"],
            correctAnswers: [1], // Index of correct answer
            explanation: "JavaScript is dynamically typed",
          },
        ],
      },
      {
        id: "3",
        title: "SQL Basics",
        description: "Test your fundamental SQL knowledge",
        questions: [
          {
            type: "single",
            question: "What is the primary purpose of SQL?",
            options: [
              "Styling web pages",
              "Creating animations",
              "Querying and managing relational databases",
              "Mobile app development",
            ],
            correctAnswers: [2],
            explanation:
              "SQL is used for managing data in relational database systems",
          },
          {
            type: "single",
            question:
              "Which SQL statement is used to retrieve data from a database?",
            options: ["SELECT", "GET", "FETCH", "REQUEST"],
            correctAnswers: [0],
            explanation:
              "SELECT statement is used to query data from databases",
          },
          {
            type: "multiple",
            question: "Which of these are SQL sublanguages?",
            options: [
              "DDL (Data Definition Language)",
              "DML (Data Manipulation Language)",
              "DCL (Data Control Language)",
              "HTML (HyperText Markup Language)",
              "CSS (Cascading Style Sheets)",
            ],
            correctAnswers: [0, 1, 2],
            explanation:
              "DDL, DML, and DCL are SQL sublanguages - HTML/CSS are for web development",
          },
          {
            type: "boolean",
            question: "SQL keywords are case-sensitive",
            options: ["True", "False"],
            correctAnswers: [1],
            explanation:
              "SQL keywords are NOT case-sensitive (though data values can be)",
          },
          {
            type: "multiple",
            question: "Which of these are valid SQL JOIN types?",
            options: [
              "INNER JOIN",
              "LEFT JOIN",
              "RIGHT JOIN",
              "FULL JOIN",
              "LOOP JOIN",
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: "LOOP JOIN is not a standard SQL JOIN type",
          },
          {
            type: "boolean",
            question: "The DELETE statement is used to remove existing records",
            options: ["True", "False"],
            correctAnswers: [0],
            explanation:
              "Correct - DELETE removes existing records from a table",
          },
          {
            type: "single",
            question: "What does a PRIMARY KEY constraint do?",
            options: [
              "Uniquely identifies each record in a table",
              "Links two tables together",
              "Ensures data is formatted correctly",
              "Automatically increments values",
            ],
            correctAnswers: [0],
            explanation:
              "PRIMARY KEY uniquely identifies each record in a database table",
          },
        ],
      },
      {
        id: "4", // Unique ID
        title: "Python for Beginners",
        description: "Test your basic Python knowledge",
        questions: [
          {
            type: "single",
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "define", "def", "func"],
            correctAnswers: [2], // Index of correct answer
            explanation:
              "In Python, functions are defined using the 'def' keyword.",
          },
          {
            type: "multiple",
            question: "Which of the following are valid Python data types?",
            options: ["int", "str", "boolean", "list"],
            correctAnswers: [0, 1, 3], // Indices of correct answers
            explanation:
              "'boolean' is incorrect; Python uses 'bool' for boolean values.",
          },
          {
            type: "boolean",
            question: "Python is a case-sensitive programming language.",
            options: ["True", "False"],
            correctAnswers: [0], // Index of correct answer
            explanation:
              "Python treats variables and function names as case-sensitive.",
          },
        ],
      },
      {
        id: "5", // Unique ID
        title: "Java Basics",
        description: "Test your basic Java knowledge",
        questions: [
          {
            type: "single",
            question: "Which keyword is used to define a class in Java?",
            options: ["class", "Class", "define", "struct"],
            correctAnswers: [0], // Index of correct answer
            explanation:
              "In Java, the 'class' keyword is used to define a class.",
          },
          {
            type: "multiple",
            question:
              "Which of the following are valid Java primitive data types?",
            options: ["int", "String", "boolean", "float"],
            correctAnswers: [0, 2, 3], // Indices of correct answers
            explanation:
              "'String' is not a primitive data type; it is a class in Java.",
          },
          {
            type: "boolean",
            question: "Java supports multiple inheritance using classes.",
            options: ["True", "False"],
            correctAnswers: [1], // Index of correct answer
            explanation:
              "Java does not support multiple inheritance with classes to avoid ambiguity; it uses interfaces instead.",
          },
        ],
      },
      {
        id: "6", // Unique ID
        title: "Data Structures",
        description: "Test your knowledge of fundamental data structures",
        questions: [
          {
            type: "single",
            question:
              "Which data structure follows the Last In, First Out (LIFO) principle?",
            options: ["Queue", "Stack", "Linked List", "Heap"],
            correctAnswers: [1], // Index of correct answer
            explanation:
              "A stack follows the LIFO (Last In, First Out) principle.",
          },
          {
            type: "multiple",
            question: "Which of the following are linear data structures?",
            options: ["Array", "Stack", "Graph", "Queue"],
            correctAnswers: [0, 1, 3], // Indices of correct answers
            explanation:
              "Arrays, Stacks, and Queues are linear data structures, whereas Graph is non-linear.",
          },
          {
            type: "boolean",
            question: "A binary search tree (BST) allows duplicate values.",
            options: ["True", "False"],
            correctAnswers: [1], // Index of correct answer
            explanation:
              "A standard BST does not allow duplicate values; all elements must be unique.",
          },
        ],
      },
      {
        id: "7", // Unique ID
        title: "Machine Learning",
        description: "Test your basic knowledge of Machine Learning concepts",
        questions: [
          {
            type: "single",
            question: "Which type of Machine Learning involves labeled data?",
            options: [
              "Supervised Learning",
              "Unsupervised Learning",
              "Reinforcement Learning",
              "Deep Learning",
            ],
            correctAnswers: [0], // Index of correct answer
            explanation:
              "Supervised Learning uses labeled data to train models.",
          },
          {
            type: "multiple",
            question:
              "Which of the following are common Machine Learning algorithms?",
            options: [
              "Linear Regression",
              "K-Means Clustering",
              "Decision Tree",
              "Quick Sort",
            ],
            correctAnswers: [0, 1, 2], // Indices of correct answers
            explanation:
              "Linear Regression, K-Means, and Decision Trees are ML algorithms, while Quick Sort is a sorting algorithm.",
          },
          {
            type: "boolean",
            question: "Neural Networks are inspired by the human brain.",
            options: ["True", "False"],
            correctAnswers: [0], // Index of correct answer
            explanation:
              "Neural Networks are designed based on the structure and functioning of the human brain.",
          },
        ],
      },
      {
        id: "8", // Unique ID
        title: "Generative AI Basics",
        description: "Test your knowledge of Generative AI concepts",
        questions: [
          {
            type: "single",
            question:
              "Which type of neural network is commonly used in Generative AI?",
            options: [
              "Convolutional Neural Network (CNN)",
              "Recurrent Neural Network (RNN)",
              "Generative Adversarial Network (GAN)",
              "Random Forest",
            ],
            correctAnswers: [2], // Index of correct answer
            explanation:
              "Generative Adversarial Networks (GANs) are widely used for generating new data similar to a given dataset.",
          },
          {
            type: "multiple",
            question:
              "Which of the following are applications of Generative AI?",
            options: [
              "Image Generation",
              "Text Generation",
              "Data Compression",
              "Video Synthesis",
            ],
            correctAnswers: [0, 1, 3], // Indices of correct answers
            explanation:
              "Generative AI is used in image generation, text generation, and video synthesis, but data compression is not its primary application.",
          },
          {
            type: "boolean",
            question:
              "Large Language Models (LLMs) like GPT-4 are a form of Generative AI.",
            options: ["True", "False"],
            correctAnswers: [0], // Index of correct answer
            explanation:
              "LLMs like GPT-4 generate human-like text and are a type of Generative AI.",
          },
        ],
      },
      {
        id: "9", // Unique ID
        title: "Cloud Computing",
        description: "Test your basic knowledge of Cloud Computing concepts",
        questions: [
          {
            type: "single",
            question:
              "Which of the following is a key characteristic of Cloud Computing?",
            options: [
              "Manual resource allocation",
              "On-demand self-service",
              "Fixed infrastructure",
              "Limited scalability",
            ],
            correctAnswers: [1], // Index of correct answer
            explanation:
              "Cloud computing allows users to provision resources on-demand without manual intervention.",
          },
          {
            type: "multiple",
            question: "Which of the following are common Cloud Service models?",
            options: [
              "Infrastructure as a Service (IaaS)",
              "Platform as a Service (PaaS)",
              "Software as a Service (SaaS)",
              "Database as a Service (DaaS)",
            ],
            correctAnswers: [0, 1, 2], // Indices of correct answers
            explanation:
              "IaaS, PaaS, and SaaS are the three primary cloud service models, whereas DaaS is not a widely recognized category.",
          },
          {
            type: "boolean",
            question:
              "Cloud computing eliminates the need for physical data centers.",
            options: ["True", "False"],
            correctAnswers: [1], // Index of correct answer
            explanation:
              "Cloud computing reduces reliance on physical data centers but does not eliminate them, as cloud providers maintain massive data centers.",
          },
        ],
      },
      {
        id: "10", // Unique ID
        title: "C++ Basics",
        description: "Test your basic knowledge of C++ programming",
        questions: [
          {
            type: "single",
            question:
              "Which symbol is used to denote a single-line comment in C++?",
            options: ["/* */", "//", "#", "--"],
            correctAnswers: [1], // Index of correct answer
            explanation: "In C++, single-line comments are denoted using '//'.",
          },
          {
            type: "multiple",
            question: "Which of the following are valid C++ data types?",
            options: ["int", "string", "bool", "float"],
            correctAnswers: [0, 2, 3], // Indices of correct answers
            explanation:
              "'string' is not a primitive data type in C++; instead, C++ uses 'std::string' from the Standard Library.",
          },
          {
            type: "boolean",
            question:
              "C++ supports both procedural and object-oriented programming paradigms.",
            options: ["True", "False"],
            correctAnswers: [0], // Index of correct answer
            explanation:
              "C++ is a multi-paradigm language supporting both procedural and object-oriented programming.",
          },
        ],
      },
    ];
    setQuizzes(mockQuizzes);
  }, []);
  const startQuiz = (quizId) => {
    const selectedQuiz = quizzes.find((q) => q.id === quizId);
    setCurrentQuiz(selectedQuiz);
  };

  const submitAnswer = (quizId, questionIndex, userAnswer) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    const question = quiz?.questions?.[questionIndex];
    if (!question) {
      console.error("Question not found");
      return;
    }

    const processedAnswer = Array.isArray(userAnswer)
      ? userAnswer.map(Number)
      : Number(userAnswer);
    const correctAnswers = question.correctAnswers
      .map(Number)
      .sort((a, b) => a - b);

    let isCorrect = false;

    switch (question.type) {
      case "multiple":
        // const sortedUser = [...userAnswer].sort();
        // const sortedCorrect = [...correctAnswers].sort();
        isCorrect =
          JSON.stringify(processedAnswer) === JSON.stringify(correctAnswers);
        break;

      case "single":
      case "boolean":
      default:
        isCorrect = correctAnswers.includes(processedAnswer);
        break;
    }
    setUserProgress((prev) => ({
      ...prev,
      [quizId]: {
        ...prev[quizId],
        [questionIndex]: {
          answer: processedAnswer,
          isCorrect,
          timestamp: new Date().toISOString(),
        },
      },
    }));

    if (isCorrect) {
      setScores((prev) => ({
        ...prev,
        [quizId]: (prev[quizId] || 0) + 1,
      }));
    }
  };

  const completeQuiz = (quizId, score) => {
    setScores((prev) => ({
      ...prev,
      [quizId]: {
        score,
        date: new Date().toISOString(),
      },
    }));
    setCurrentQuiz(null);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        currentQuiz,
        userProgress,
        scores,
        startQuiz,
        submitAnswer,
        completeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
