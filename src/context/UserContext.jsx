// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("quizAppUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("quizAppUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Sync localStorage on users change
  useEffect(() => {
    localStorage.setItem("quizAppUsers", JSON.stringify(users));
  }, [users]);

  const login = (credentials) => {
    // Admin login
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      const adminUser = {
        id: "admin",
        name: "Admin",
        role: "admin",
        scores: [],
        createdAt: new Date().toISOString(),
      };

      setCurrentUser(adminUser);
      localStorage.setItem("quizAppUser", JSON.stringify(adminUser));
      return adminUser;
    }

    // Normal user login
    const existingUser = users.find(
      (user) => user.name.toLowerCase() === credentials.username.toLowerCase()
    );

    let user;
    if (existingUser) {
      user = existingUser;
    } else {
      user = {
        id: Date.now(),
        name: credentials.username || "Guest",
        role: "user",
        scores: [],
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, user]);
    }

    setCurrentUser(user);
    localStorage.setItem("quizAppUser", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("quizAppUser");
  };

  const updateUserScore = (quizId, score) => {
    setCurrentUser((prevUser) => {
      if (!prevUser) return null;

      const updatedUser = {
        ...prevUser,
        scores: [
          ...prevUser.scores,
          {
            quizId,
            score,
            date: new Date().toISOString(),
          },
        ],
      };

      // Update users list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );

      return updatedUser;
    });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        updateUserScore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
