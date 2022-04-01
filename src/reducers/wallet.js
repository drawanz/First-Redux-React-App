import { GET_CURRENCIES, GET_CURRENCIES_SUCESS, GET_CURRENCIES_FAIL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state };
  case GET_CURRENCIES_SUCESS:
    return { ...state, currencies: [...action.currencies] };
  case GET_CURRENCIES_FAIL:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default wallet;
