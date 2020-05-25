import { login } from '../../api';
import {
  LOG_IN_BEGIN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
} from '../actions/actionTypes';

export const logInUser = (username, password) => async dispatch => {
  dispatch(loginBegin());
  try {
    const token = await login(username, password);
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
const loginBegin = () => ({ type: LOG_IN_BEGIN });
const loginSuccess = token => ({ type: LOG_IN_SUCCESS, payload: token });
const loginFailure = error => ({ type: LOG_IN_FAILURE, payload: error });

export const logOutUser = () => async dispatch => {
  dispatch({ type: LOG_OUT });
};
