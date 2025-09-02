import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import AboutPage from './Pages/About';
import AuthPage from './Pages/Auth';
import SkillListings from './Pages/SkillListings'; // Add this import
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // **UPDATED: Hide navbar on these specific pages**
  const pathsWithoutMainNavbar = ['/auth', '/dashboard', '/skills'];
  const hideMainNavbar = pathsWithoutMainNavbar.includes(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* **UPDATED: Only show main navbar when not on dashboard/skills pages** */}
      {!hideMainNavbar && (
        <Navbar
          isLoggedIn={!!user}
          onLoginClick={() => navigate('/auth')}
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
                <HomePage onGetstartedClick={() => navigate('/auth')} />
              )
            }
          />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes with their own navbars */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* **NEW: Skills page route** */}
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <SkillListings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* **UPDATED: Only show footer when main navbar is visible** */}
      {!hideMainNavbar && <Footer />}
    </div>
  );
}

export default App;
