// Action for login
import * as TYPES from '../types';

export const Login = (data) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.LOGIN,
      data: data,
    });
  };
};
