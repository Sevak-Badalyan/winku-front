import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader/> 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;

