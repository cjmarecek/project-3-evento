//action types
import {
  FETCH_EVENTS_BEGIN,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_RESET,
  POST_EVENT_BEGIN,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE,
  POST_EVENT_RESET,
  UPDATE_EVENT_BEGIN,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  DELETE_EVENT_BEGIN,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  events: [],
  loading: false,
  error: null,
  event: {},
};

// const merge = (prev, next) => Object.assign({}, prev, next);

export default eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS_BEGIN:
      return {
        ...state,
        events: [],
        loading: true,
        error: null,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        events: [],
        loading: false,
        error: action.payload,
      };
    case FETCH_EVENTS_RESET:
      return {
        events: [],
        loading: false,
        error: null,
        event: {}
      };

    case POST_EVENT_BEGIN:
      return {
        ...state,
        loading: true, error: null 
      };
    case POST_EVENT_SUCCESS:
      return {
        ...state,
        events: [action.payload, ...state.events],
        loading: false, error: null };
    case POST_EVENT_FAILURE:
      return {
        ...state,
        loading: false, error: action.payload 
      };
    case POST_EVENT_RESET:
      return {
        ...state,
        loading: false, error: null
      };

    case UPDATE_EVENT_BEGIN:
      return {
        ...state,
        event: {},
        loading: true,
        error: null,
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        event: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        event: {},
        loading: false,
        error: action.payload,
      };

    case DELETE_EVENT_BEGIN:
      return {
        ...state,
        loading: true, error: null
      };
    case DELETE_EVENT_SUCCESS:
      let index = state.events.findIndex(
        (event) => event._id === action.payload,
      );
      state.events.splice(index, 1);
      return {
        ...state,
        loading: false, error: null 
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false, error: action.payload 
      };
    default:
      return state;
  }
};
