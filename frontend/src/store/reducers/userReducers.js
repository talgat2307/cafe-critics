import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

const userLoginState = {
  loading: false,
  error: null,
  userInfo: null,
};

export const userLoginReducer = (state = userLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.user };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_LOGOUT:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

const userRegisterState = {
  loading: false,
  error: null,
  userInfo: null,
};

export const userRegisterReducer = (state = userRegisterState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.user };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
