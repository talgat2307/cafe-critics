import {
  GET_IMAGE_FAIL,
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/imageConstants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  uploadError: null,
  images: [],
};

export const imageReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGE_REQUEST:
      return { ...state, loading: true };
    case GET_IMAGE_SUCCESS:
      return { ...state, loading: false, images: action.image };
    case GET_IMAGE_FAIL:
      return { ...state, error: action.error };
    case UPLOAD_IMAGE_REQUEST:
      return { ...state, loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPLOAD_IMAGE_FAIL:
      return { ...state, uploadError: action.error };
    default:
      return state;
  }
}