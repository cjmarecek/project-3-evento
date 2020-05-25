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
  FETCH_EVENT_BEGIN,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
  FETCH_EVENT_RESET,
  UPDATE_EVENT_BEGIN,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  DELETE_EVENT_BEGIN,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  eventsList: { events: [], loading: false, error: null },
  newEvent: { event: null, loading: false, error: null },
  event: { event: {}, loading: false, error: null },
};

// const merge = (prev, next) => Object.assign({}, prev, next);

export default eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS_BEGIN:
      return {
        ...state,
        eventsList: { events: [], loading: true, error: null },
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        eventsList: { events: action.payload, loading: false, error: null },
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        eventsList: { events: [], loading: false, error: action.payload },
      };
    case FETCH_EVENTS_RESET:
      return {
        ...state,
        eventsList: { events: [], loading: false, error: null },
      };

    case POST_EVENT_BEGIN:
      return {
        ...state,
        newEvent: { event: null, loading: true, error: null },
      };
    case POST_EVENT_SUCCESS:
      return {
        ...state,
        eventsList: { events: [...events, action.payload] },
        newEvent: { event: action.payload, loading: false, error: null },
      };
    case POST_EVENT_FAILURE:
      return {
        ...state,
        newEvent: { event: null, loading: false, error: action.payload },
      };
    case POST_EVENT_RESET:
      return {
        ...state,
        newEvent: { event: null, loading: false, error: null },
      };

    case FETCH_EVENT_BEGIN:
      return {
        ...state,
        event: { event: null, loading: true, error: null },
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        event: { event: action.payload, loading: false, error: null },
      };
    case FETCH_EVENT_FAILURE:
      return {
        ...state,
        event: { event: null, loading: false, error: action.payload },
      };
    case FETCH_EVENT_RESET:
      return {
        ...state,
        event: { event: null, loading: false, error: null },
      };

    case UPDATE_EVENT_BEGIN:
      return {
        ...state,
        event: { event: {}, loading: true, error: null },
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        event: { event: action.payload, loading: false, error: null },
      };
    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        event: { event: {}, loading: false, error: action.payload },
      };

    case DELETE_EVENT_BEGIN:
      return {
        ...state,
        event: { event: null, loading: true, error: null },
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        event: { event: action.payload, loading: false, error: null },
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        event: { event: null, loading: false, error: action.payload },
      };
    default:
      return state;
  }
};
