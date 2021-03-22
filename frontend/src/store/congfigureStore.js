import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import {
  cafeCreateReducer,
  cafeDetailsReducer,
  cafeListReducer,
} from './reducers/cafeReducers';
import { imageReducers } from './reducers/imageReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  cafeList: cafeListReducer,
  cafeDetails: cafeDetailsReducer,
  cafeCreate: cafeCreateReducer,
  galleryImage: imageReducers,
  router: connectRouter(history),
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
  localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;



