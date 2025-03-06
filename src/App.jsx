import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { darkModeContext } from "./context/DarkModeContext";
import { QuizProvider } from "./context/QuizContext";
import { UserProvider } from "./context/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <UserProvider>
      <darkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <QuizProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/quiz/:id"
                element={
                  <ErrorBoundary>
                    <Quiz />
                  </ErrorBoundary>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </QuizProvider>
      </darkModeContext.Provider>
    </UserProvider>
  );
}
