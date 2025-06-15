import path from 'path';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectLoading,
  selectUserData
} from '../../services/slices/authSlice';
import { Preloader } from '@ui';

type TProtectedRoute = {
  isPublic?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, isPublic = false }: TProtectedRoute) {
  const isAuthCheck = useSelector(selectIsAuthenticated);
  const loginUserRequest = useSelector(selectLoading);

  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthCheck && loginUserRequest) {
    return <Preloader />;
  }

  if (!isAuthCheck && !isPublic) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuthCheck && isPublic) {
    return <Navigate to={from} />;
  }

  return children;
}

export default ProtectedRoute;
