import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

const randomId = () => crypto.randomUUID();

export interface IBurgerConstructorSliceState {
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isIngredientsLoading: boolean;
  error: string | null;
}

export const initialState: IBurgerConstructorSliceState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  isIngredientsLoading: false,
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.burgerConstructor.bun = payload;
        } else if (payload.type === 'main' || payload.type === 'sauce') {
          state.burgerConstructor.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: randomId() }
      })
    },
    moveIngredientUp: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index > 0) {
        const temp = state.burgerConstructor.ingredients[index];
        state.burgerConstructor.ingredients[index] =
          state.burgerConstructor.ingredients[index - 1];
        state.burgerConstructor.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index < state.burgerConstructor.ingredients.length - 1) {
        const temp = state.burgerConstructor.ingredients[index];
        state.burgerConstructor.ingredients[index] =
          state.burgerConstructor.ingredients[index + 1];
        state.burgerConstructor.ingredients[index + 1] = temp;
      }
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (ingredient) => ingredient.id != payload.id
        );
    },
    clearConstructor: (state) => {
      state.burgerConstructor.bun = null;
      state.burgerConstructor.ingredients = [];
      state.isIngredientsLoading = false;
    }
  },
  selectors: {
    selectConstructorBurger: (state) => state
  }
});

export const { selectConstructorBurger } = burgerConstructorSlice.selectors;
export const {
  addIngredients,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
const burgerConstructorReducer = burgerConstructorSlice.reducer;
export default burgerConstructorReducer;
