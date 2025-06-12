import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectUserData
} from '../../services/slices/authSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserData).name;
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {}, [userName]);

  return (
    <AppHeaderUI userName={isAuthenticated ? userName : 'Личный кабинет'} />
  );
};
