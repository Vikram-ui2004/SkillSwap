import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'; // make sure you export auth from firebase.js
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import AboutPage from './Pages/About';
import AuthPage from './Pages/Auth';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const pathsWithoutLayout = ['/auth', '/dashboard'];
  const hideLayout =
    pathsWithoutLayout.includes(location.pathname) ||
    (location.pathname === '/' && currentUser);

  // 🔹 Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {!hideLayout && (
        <Navbar
          isLoggedIn={!!currentUser}
          onLoginClick={() => navigate('/auth')}
          onLogout={handleLogout}
          userName={user?.displayName || user?.email}
        />
      )}

      {/* 🔹 Main routes */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Dashboard currentUser={currentUser} onLogout={handleLogout} />
              ) : (
                <HomePage onGetstartedClick={() => navigate("/auth")} />
              )
            }
          />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes with their own navbars */}
          <Route
            path="/dashboard"
            element={<Dashboard currentUser={currentUser} onLogout={handleLogout} />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
