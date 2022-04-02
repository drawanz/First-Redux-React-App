export const ADD_EMAIL = 'ADD_EMAIL';

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

export const GET_EXCHANGE = 'GET_EXCHANGE';
export const GET_EXCHANGE_SUCESS = 'GET_EXCHANGE_SUCESS';
export const GET_EXCHANGE_FAIL = 'GET_EXCHANGE_FAIL';

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const emailAction = (email) => ({ type: ADD_EMAIL, email });

// export const expenseAction = (expense) => ({ type: ADD_EXPENSE, expense });

export const actionGetCurrencies = () => ({ type: GET_CURRENCIES });

export const actionGetCurrenciesSucess = (currencies) => ({
  type: GET_CURRENCIES_SUCESS,
  currencies,
});

export const actionGetCurrenciesFail = (error) => ({ type: GET_EXCHANGE_FAIL, error });

export const actionGetExchange = () => ({ type: GET_EXCHANGE });

export const actionGetExchangeSucess = (expense) => ({
  type: GET_EXCHANGE_SUCESS,
  expense,
});

export const actionGetExchangeFail = (error) => ({ type: GET_EXCHANGE_FAIL, error });

export const thunkGetCurrencies = () => async (dispatch) => {
  dispatch(actionGetCurrencies());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const currencies = Object.keys(data);
    dispatch(actionGetCurrenciesSucess(currencies));
  } catch (e) {
    dispatch(actionGetCurrenciesFail(e));
  }
};

export const thunkGetExchange = (expense) => async (dispatch) => {
  dispatch(actionGetExchange());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    // const { ask } = exchanges[currency];
    const testeExpense = { ...expense, exchangeRates };
    dispatch(actionGetExchangeSucess(testeExpense));
  } catch (e) {
    dispatch(actionGetExchangeFail(e));
  }
};

export const actionRemoveExpense = (id) => ({ type: REMOVE_EXPENSE, id });
