import path from 'path';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectloginRequest
} from '../../services/slices/authSlice';
import { Preloader } from '@ui';

type TProtectedRoute = {
  isPublic?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, isPublic = false }: TProtectedRoute) {
  const user = useSelector((state) => state.auth.data.name);
  const isAuthCheck = useSelector(selectIsAuthenticated);
  const loginUserRequest = useSelector(selectloginRequest);

  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthCheck && loginUserRequest) {
    return <Preloader />;
  }

  if (!isAuthCheck && !isPublic) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuthCheck && isPublic) {
    return <Navigate to='/' />;
  }

  return children;
}

export default ProtectedRoute;
