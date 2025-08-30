import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal'; // Make sure this path is correct

const AuthPage = ({ mode, onAuth, onSwitchMode }) => {
  const navigate = useNavigate();

  // When the modal is closed from this page, navigate the user to the homepage.
  const handleClose = () => {
    navigate('/');
  };

  return (
    // You can style this div to be a background for your modal
    <div className="w-full h-full">
      <AuthModal 
        mode={mode}
        onAuth={onAuth}
        onSwitchMode={onSwitchMode}
        onClose={handleClose} // Use the new navigate handler
      />
    </div>
  );
};

export default AuthPage;