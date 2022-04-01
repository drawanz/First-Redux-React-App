export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

export const emailAction = (email) => ({ type: ADD_EMAIL, email });

export const actionGetCurrencies = () => ({ type: GET_CURRENCIES });

export const actionGetCurrenciesSucess = (currencies) => ({
  type: GET_CURRENCIES_SUCESS,
  currencies,
});

export const actionGetCurrenciesFail = (error) => ({ type: GET_CURRENCIES_FAIL, error });

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
