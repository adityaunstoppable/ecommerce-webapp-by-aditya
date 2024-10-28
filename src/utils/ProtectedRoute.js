import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SIGNIN_PATH } from './contants';

const ProtectedRoute = ({ children }) => {
  const email = useSelector((state) => state.auth.email);
  
  if (!email) {
    return <Navigate to={SIGNIN_PATH} />;
  }

  return children; 
};

export default ProtectedRoute;
