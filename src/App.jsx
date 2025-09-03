import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase"; // make sure you export auth from firebase.js
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import Dashboard from "./Pages/Dashboard";
import AboutPage from "./Pages/About";
import AuthPage from "./Pages/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const pathsWithoutLayout = ["/auth", "/dashboard"];
  const hideLayout =
    pathsWithoutLayout.includes(location.pathname) ||
    (location.pathname === "/" && currentUser);

  // 🔹 Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // 🔹 Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
        </div>
      );
    }
    return currentUser ? children : <Navigate to="/auth" replace />;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* 🔹 Show Navbar only when not hidden */}
      {!hideLayout && (
        <Navbar
          isLoggedIn={!!currentUser}
          onLoginClick={() => navigate("/auth")}
          onLogout={handleLogout}
          userName={currentUser?.displayName || currentUser?.email}
        />
      )}

      {/* 🔹 Main routes */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <HomePage onGetstartedClick={() => navigate("/auth")} />
              )
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>

      {/* 🔹 Show Footer only when not hidden */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
