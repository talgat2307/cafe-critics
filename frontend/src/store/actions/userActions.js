import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants';
import axiosApi from '../../axiosApi';

const userLoginRequest = () => ({ type: USER_LOGIN_REQUEST });
const userLoginSuccess = user => ({ type: USER_LOGIN_SUCCESS, user });
const userLoginFail = error => ({ type: USER_LOGIN_FAIL, error });

const userRegisterRequest = () => ({ type: USER_REGISTER_REQUEST });
const userRegisterSuccess = user => ({ type: USER_REGISTER_SUCCESS, user });
const userRegisterFail = error => ({ type: USER_REGISTER_FAIL, error });


export const login = (user) => {
  return async dispatch => {
    try {
      dispatch(userLoginRequest());

      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axiosApi.post('/users/login', user, config);
      dispatch(userLoginSuccess(response.data));

      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (e) {
      dispatch(userLoginFail(e.response && e.response.data.message
        ? e.response.data.message
        : e.message));
    }
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_LOGOUT });
  };
};

export const register = (user) => {
  return async dispatch => {
    try {
      dispatch(userRegisterRequest());
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axiosApi.post('/users', user, config);
      dispatch(userRegisterSuccess(response.data));
      dispatch(userLoginSuccess(response.data));
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (e) {
      dispatch(userRegisterFail(e.response && e.response.data.message
        ? e.response.data.message
        : e.message));
    }
  };
};
