import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return token !== null;
};


interface ProtectedRouteProps {
  children: JSX.Element;
}
interface PublicRouteProps {
    children: JSX.Element; 
}


export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};


export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/blogs" replace /> : children;
  };
