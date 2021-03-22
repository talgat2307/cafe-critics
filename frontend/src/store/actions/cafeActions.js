import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS,
  CAFE_DELETE_FAIL, CAFE_DELETE_REQUEST,
  CAFE_DELETE_SUCCESS,
  CAFE_DETAILS_FAIL,
  CAFE_DETAILS_REQUEST, CAFE_DETAILS_SUCCESS,
  CAFE_LIST_FAIL,
  CAFE_LIST_REQUEST,
  CAFE_LIST_SUCCESS, CREATE_CAFE_FAIL, CREATE_CAFE_REQUEST, CREATE_CAFE_SUCCESS,
} from '../constants/cafeConstants';
import axiosApi from '../../axiosApi';
import { push } from 'connected-react-router';

const cafeListRequest = () => ({ type: CAFE_LIST_REQUEST });
const cafeListSuccess = cafes => ({ type: CAFE_LIST_SUCCESS, cafes });
const cafeListFail = error => ({ type: CAFE_LIST_FAIL, error });

const cafeDetailsRequest = () => ({ type: CAFE_DETAILS_REQUEST });
const cafeDetailsSuccess = cafe => ({ type: CAFE_DETAILS_SUCCESS, cafe });
const cafeDetailsFail = error => ({ type: CAFE_DETAILS_FAIL, error });

const createCafeRequest = () => ({ type: CREATE_CAFE_REQUEST });
const createCafeSuccess = () => ({ type: CREATE_CAFE_SUCCESS });
const createCafeFail = error => ({ type: CREATE_CAFE_FAIL, error });

const cafeDeleteRequest = () => ({ type: CAFE_DELETE_REQUEST });
const cafeDeleteSuccess = id => ({ type: CAFE_DELETE_SUCCESS, id });
const cafeDeleteFail = error => ({ type: CAFE_DELETE_FAIL, error });

const addReviewRequest = () => ({ type: ADD_REVIEW_REQUEST });
const addReviewSuccess = review => ({ type: ADD_REVIEW_SUCCESS, review });
const addReviewFail = error => ({ type: ADD_REVIEW_FAIL, error });

export const getCafeList = () => {
  return async (dispatch) => {
    dispatch(cafeListRequest());
    try {
      const response = await axiosApi.get('/cafes');
      dispatch(cafeListSuccess(response.data));
    } catch (e) {
      dispatch(cafeListFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const getCafe = (id) => {
  return async (dispatch) => {
    dispatch(cafeDetailsRequest());
    try {
      const response = await axiosApi.get(`/cafes/${id}`);
      dispatch(cafeDetailsSuccess(response.data));
    } catch (e) {
      dispatch(cafeDetailsFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const createCafe = (cafeData) => {
  return async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(createCafeRequest());
    try {
      const response = await axiosApi.post('/cafes', cafeData, config);
      dispatch(createCafeSuccess(response.data));
      dispatch(push('/'));
    } catch (e) {
      dispatch(createCafeFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};

export const deleteCafe = (id) => {
  return async (dispatch, getState) => {

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(cafeDeleteRequest());
    try {
      await axiosApi.delete(`/cafes/${id}`, config);
      dispatch(cafeDeleteSuccess(id));
    } catch (e) {
      dispatch(cafeDeleteFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const addReview = (review, id) => {
  return async (dispatch, getState) => {

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(addReviewRequest());
    try {
      await axiosApi.post(`/cafes/${id}/review`, review, config);
      dispatch(addReviewSuccess());
    } catch (e) {
      dispatch(addReviewFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};