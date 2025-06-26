import reducer, {
  initialState,
  ingredientsSelector,
  isIngredientsLoadingSelector,
  fetchIngredients
} from '../slices/burger-ingredientSlice';
import { mockIngridients } from '../../mocks/ingredient';
import { v4 as uuidv4 } from 'uuid';
const mockedUUID = 'test-uuid';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

describe('Check slice ingridients', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockedUUID);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Check initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Check selector', () => {
    it('ingredientsSelector', () => {
      expect(
        ingredientsSelector({
          ingredients: mockIngridients
        })
      ).toBe(mockIngridients.ingredients);
    });

    it('isIngredientsLoadingSelector', () => {
      expect(
        isIngredientsLoadingSelector({
          ingredients: mockIngridients
        })
      ).toBe(mockIngridients.isIngredientsLoading);
    });
  });

  describe('Check extraReducers', () => {
    describe('fetchIngredients', () => {
      it('pending', () => {
        const action = { type: fetchIngredients.pending.type };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchIngredients.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = mockIngridients.ingredients;

        const action = {
          type: fetchIngredients.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.ingredients).toEqual(mockResponse);
      });
    });
  });
});
