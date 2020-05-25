import {
  LOG_IN_BEGIN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
} from '../actions/actionTypes';

const merge = (prev, next) => Object.assign({}, prev, next);

export default userReducer = (
  state = { loading: false, token: null, isSignout: true, error: null },
  action,
) => {
  switch (action.type) {
    case LOG_IN_BEGIN:
      return merge(state, { loading: true });
    case LOG_IN_SUCCESS:
      return merge(state, {
        loading: false,
        isSignout: false,
        token: action.payload,
      });
    case LOG_IN_FAILURE:
      return merge(state, {
        loading: false,
        isSignout: true,
        error: action.payload,
      });
    case LOG_OUT:
      return merge(state, {
        loading: false,
        isSignout: true,
        token: null,
      });
    default:
      return state;
  }
};
