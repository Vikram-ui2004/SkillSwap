import React from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

const AuthPage = ({ mode, onSwitchMode }) => {
  const navigate = useNavigate();

  // ✅ Close modal → go back to home
  const handleClose = () => {
    navigate("/");
  };

  // ✅ When auth succeeds → go to dashboard
  const handleAuthSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-full">
      <AuthModal
        mode={mode}
        onSwitchMode={onSwitchMode}
        onClose={handleClose}
        onAuthSuccess={handleAuthSuccess} // 🔑 pass this down
      />
    </div>
  );
};

export default AuthPage;
