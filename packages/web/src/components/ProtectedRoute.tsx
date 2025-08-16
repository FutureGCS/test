import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { session } = useAuth();

  // If there's a session, render the child routes, otherwise redirect to login
  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
