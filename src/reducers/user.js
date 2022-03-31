import { ADD_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  state: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return { state };
  default: return state;
  }
};

export default user;
