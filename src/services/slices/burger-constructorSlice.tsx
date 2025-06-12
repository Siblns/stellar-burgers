import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

const randomId = () => crypto.randomUUID();

export interface IBurgerConstructorSliceState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IBurgerConstructorSliceState = {
  constructorItems: {
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
          state.constructorItems.bun = payload;
        } else if (payload.type === 'main' || payload.type === 'sauce') {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: randomId() }
      })
    },
    moveIngredientUp: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index > 0) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = temp;
      }
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != payload.id
        );
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
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
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
