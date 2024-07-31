import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router';

function SignOut() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    alert("SignOut successfully");
    navigate("/");
  };

  return (
    <div onClick={handleSignOut}>Sign Out</div>
  );
}

export default SignOut;
