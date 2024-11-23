import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return token !== null;
};


interface ProtectedRouteProps {
  children: JSX.Element;
}


export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};


