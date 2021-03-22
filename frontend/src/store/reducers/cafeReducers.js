import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS,
  CAFE_DELETE_FAIL,
  CAFE_DELETE_SUCCESS,
  CAFE_DETAILS_FAIL,
  CAFE_DETAILS_REQUEST,
  CAFE_DETAILS_SUCCESS,
  CAFE_LIST_FAIL,
  CAFE_LIST_REQUEST,
  CAFE_LIST_SUCCESS, CREATE_CAFE_FAIL, CREATE_CAFE_REQUEST, CREATE_CAFE_SUCCESS,
} from '../constants/cafeConstants';

const cafeListState = {
  loading: false,
  error: null,
  deleteError: null,
  cafes: [],
};

export const cafeListReducer = (state = cafeListState, action) => {
  switch (action.type) {
    case CAFE_LIST_REQUEST:
      return { ...state, loading: true };
    case CAFE_LIST_SUCCESS:
      return { ...state, loading: false, cafes: action.cafes };
    case CAFE_LIST_FAIL:
      return { ...state, loading: false, error: action.error };
    case CAFE_DELETE_SUCCESS:
      return {
        ...state,
        cafes: state.cafes.filter(cafe => cafe._id !== action.id),
      };
    case CAFE_DELETE_FAIL:
      return { ...state, deleteError: action.error };
    default:
      return state;
  }
};

const cafeDetailsState = {
  loading: false,
  success: false,
  error: null,
  reviewError: null,
  cafe: {},
};

export const cafeDetailsReducer = (state = cafeDetailsState, action) => {
  switch (action.type) {
    case CAFE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CAFE_DETAILS_SUCCESS:
      return { ...state, loading: false, cafe: action.cafe };
    case CAFE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    case ADD_REVIEW_REQUEST:
      return { ...state, loading: true };
    case ADD_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true };
    case ADD_REVIEW_FAIL:
      return { ...state, reviewError: action.error };
    default:
      return state;
  }
};

const cafeCreateState = {
  loading: false,
  error: null,
  cafe: {},
}

export const cafeCreateReducer = (state = cafeCreateState, action) => {
  switch (action.type) {
    case CREATE_CAFE_REQUEST:
      return { ...state, loading: true };
    case CREATE_CAFE_SUCCESS:
      return { ...state, loading: false, cafe: action.data };
    case CREATE_CAFE_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};