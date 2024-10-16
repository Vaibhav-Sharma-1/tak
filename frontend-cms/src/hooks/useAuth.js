// src/hooks/useAuth.js
import { useEffect } from 'react';
import { isTokenExpired } from '../utils/authToken';
import { logout } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isTokenExpired()) {
      logout(); 
      navigate('/login'); 
    }
  }, [navigate]);

  return {
    isAuthenticated: !isTokenExpired(), 
  };
};

export default useAuth;
