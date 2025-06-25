import burgerConstructorReducer, {
  initialState,
  selectConstructorBurger,
  addIngredients,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearConstructor,
  IBurgerConstructorSliceState
} from '../slices/burger-constructorSlice';
import { bun, main, sauce } from '../../mocks/burgerConstructor';

describe('check Constructor', () => {
  test('check ingredient', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addIngredients(main)
    );
    const addedIngredients = newState.burgerConstructor;
    expect(addedIngredients.ingredients[0]._id).toEqual(main._id);
  });

  test('Add bun', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addIngredients(bun)
    );

    const addedIngredients = newState.burgerConstructor;

    expect(addedIngredients.bun?._id).toEqual(bun._id);
  });

  test('MoveUp', () => {
    const initialState: IBurgerConstructorSliceState = {
      burgerConstructor: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const stateForMoveUp = burgerConstructorReducer(
      initialState,
      moveIngredientUp(1)
    );

    const newIngredientsArrayForMoveUp = stateForMoveUp.burgerConstructor;

    expect(newIngredientsArrayForMoveUp.ingredients).toEqual([sauce, main]);
  });

  test('MoveDown', () => {
    const initialState: IBurgerConstructorSliceState = {
      burgerConstructor: {
        bun: bun,
        ingredients: [main, sauce, main]
      },
      isIngredientsLoading: false,
      error: null
    };

    const stateForMoveDown = burgerConstructorReducer(
      initialState,
      moveIngredientDown(1)
    );

    const newIngredientsArrayForMoveDown = stateForMoveDown.burgerConstructor;

    expect(newIngredientsArrayForMoveDown.ingredients).toEqual([
      main,
      main,
      sauce
    ]);
  });

  test('Delete ingredient', () => {
    const initialState: IBurgerConstructorSliceState = {
      burgerConstructor: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(sauce)
    );

    const ingredientsAfterRemoving = newState.burgerConstructor;

    expect(ingredientsAfterRemoving.ingredients).toEqual([main]);
  });

  test('clear Constructor', () => {
    const initialState: IBurgerConstructorSliceState = {
      burgerConstructor: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const newState = burgerConstructorReducer(initialState, clearConstructor());

    const stateAfterClearing = newState.burgerConstructor;

    expect(stateAfterClearing).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
