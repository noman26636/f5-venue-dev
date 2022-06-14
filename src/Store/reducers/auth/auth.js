import * as TYPES from '../../actions/types';
const initialState = {
  user: null,
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...state,
        user: action.data,
      };
    case TYPES.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default auth;
