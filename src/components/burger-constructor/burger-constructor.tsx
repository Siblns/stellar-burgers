import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorBurger
} from '../../services/slices/burger-constructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectUserData
} from '../../services/slices/authSlice';
import {
  clearOrder,
  fetchOrderBurger,
  isOrderLoadingSelector,
  orderSelector
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const burgerConstructor = useSelector(
    selectConstructorBurger
  ).burgerConstructor;

  const orderRequest = useSelector(isOrderLoadingSelector);
  const orderModalData = useSelector(orderSelector);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onOrderClick = () => {
    const { bun, ingredients } = burgerConstructor;
    if (!bun) {
      alert('Добавьте ингридиенты!');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    const order: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(fetchOrderBurger(order));
  };

  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (burgerConstructor.bun ? burgerConstructor.bun.price * 2 : 0) +
      burgerConstructor.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [burgerConstructor]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={burgerConstructor}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
