import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCESS,
  GET_CURRENCIES_FAIL,
  // ADD_EXPENSE,
  GET_EXCHANGE,
  GET_EXCHANGE_SUCESS,
  GET_EXCHANGE_FAIL,
  REMOVE_EXPENSE,
} from '../actions';

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
  case GET_EXCHANGE:
    return { ...state };
  case GET_EXCHANGE_SUCESS:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case GET_EXCHANGE_FAIL:
    return { ...state, error: action.error };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((element) => element.id !== action.id) };
  default:
    return state;
  }
};

export default wallet;
