import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import AboutPage from './Pages/About';
import MatchmakingPage from './Pages/MatchMakingPage';
import AuthPage from './Pages/Auth';
import SkillListings from './Pages/SkillListings'; 
import ProtectedRoute from './components/ProtectedRoute';
import PostSkillPage from './Pages/SkillPostingPage';

// Move constant outside component to avoid recreation on each render
const PATHS_WITHOUT_MAIN_NAVBAR = new Set([
  '/auth', 
  '/dashboard', 
  '/skills', 
  '/matchmaking', 
  '/skills/post'
]);

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Use Set.has() for O(1) lookup instead of Array.includes()
  const hideMainNavbar = PATHS_WITHOUT_MAIN_NAVBAR.has(pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const handleAuthNavigation = () => navigate('/auth');

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {!hideMainNavbar && (
        <Navbar
          isLoggedIn={!!user}
          onLoginClick={handleAuthNavigation}
          onLogout={handleLogout}
          userName={user?.displayName || user?.email}
        />
      )}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <HomePage onGetstartedClick={handleAuthNavigation} />
              )
            }
          />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <SkillListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/skills/post"
            element={
              <ProtectedRoute>
                <PostSkillPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/matchmaking"
            element={
              <ProtectedRoute>
                <MatchmakingPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideMainNavbar && <Footer />}
    </div>
  );
}

export default App;
