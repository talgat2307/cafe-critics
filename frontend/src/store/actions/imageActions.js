import {
  GET_IMAGE_FAIL,
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/imageConstants';
import axiosApi from '../../axiosApi';

const getImageRequest = () => ({ type: GET_IMAGE_REQUEST });
const getImageSuccess = image => ({ type: GET_IMAGE_SUCCESS, image });
const getImageFail = error => ({ type: GET_IMAGE_FAIL, error });

const uploadImageRequest = () => ({ type: UPLOAD_IMAGE_REQUEST });
const uploadImageSuccess = () => ({ type: UPLOAD_IMAGE_SUCCESS });
const uploadImageFail = error => ({ type: UPLOAD_IMAGE_FAIL, error });

export const getImages = (id) => {
  return async dispatch => {
    dispatch(getImageRequest());
    try {
      const response = await axiosApi.get(`/images?cafe=${id}`);
      dispatch(getImageSuccess(response.data));
    } catch (e) {
      dispatch(getImageFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};

export const uploadImage = (image) => {
  return async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch(uploadImageRequest());
    try {
      await axiosApi.post('/images', image, config);
      dispatch(uploadImageSuccess());
    } catch (e) {
      dispatch(uploadImageFail(e.response && e.response.data
        ? e.response.data
        : e.message));
    }
  };
};