import React from 'react'
import { useAuth } from './context/authContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {

  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRoutes