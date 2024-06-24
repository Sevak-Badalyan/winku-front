
// OpenRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const OpenRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setIsAuthenticated(!!userData);
  }, []);

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default OpenRoute;
