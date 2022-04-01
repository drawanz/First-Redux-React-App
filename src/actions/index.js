export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

export const emailAction = (email) => ({ type: ADD_EMAIL, email });

export const actionGetCurrencies = () => ({ type: GET_CURRENCIES });

export const actionGetCurrenciesSucess = (dataAPI) => ({
  type: GET_CURRENCIES_SUCESS,
  dataAPI,
});

export const actionGetCurrenciesFail = (error) => ({ type: GET_CURRENCIES_FAIL, error });

export const thunkGetCurrencies = () => async (dispatch) => {
  dispatch(actionGetCurrencies());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const keys = Object.keys(data);
    const dataAPI = delete keys.USDT;
    dispatch(actionGetCurrenciesSucess(dataAPI));
  } catch (e) {
    dispatch(actionGetCurrenciesFail(e));
  }
};
