import {
  getEvents,
  postEvent,
  getEvent,
  putEvent,
  deleteEvent,
} from '../../api';
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
} from './actionTypes';

//async action creators
//fetch events actions
export const fetchEvents = () => async dispatch => {
  dispatch(fetchEventsBegin());
  try {
    const events = await getEvents();
    dispatch(fetchEventsSuccess(events));
  } catch (error) {
    dispatch(fetchEventsFailure(error));
  }
};
const fetchEventsBegin = () => ({
  type: FETCH_EVENTS_BEGIN,
});
const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events,
});
const fetchEventsFailure = error => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error },
});
export const fetchEventsReset = () => ({
  type: FETCH_EVENTS_RESET,
});

//post event actions
export const createEvent = event => async dispatch => {
  dispatch(postEventBegin());
  try {
    const response = await postEvent(event);
    dispatch(postEventSuccess(response));
    fetchEvents();
  } catch (error) {
    dispatch(postEventFailure(error));
  }
};
const postEventBegin = () => ({
  type: POST_EVENT_BEGIN,
});
const postEventSuccess = event => ({
  type: POST_EVENT_SUCCESS,
  payload: event,
});
const postEventFailure = error => ({
  type: POST_EVENT_FAILURE,
  payload: error.message ,
});
export const postEventReset = () => ({
  type: POST_EVENT_RESET,
});

//update Event actions
export const updateEvent = event => async dispatch => {
  dispatch(updateEventBegin());
  try {
    const response = await putEvent(event);
    dispatch(updateEventSuccess(response));
  } catch (error) {
    dispatch(updateEventFailure(error));
  }
};
const updateEventBegin = () => ({
  type: UPDATE_EVENT_BEGIN,
});
const updateEventSuccess = event => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event,
});
const updateEventFailure = error => ({
  type: UPDATE_EVENT_FAILURE,
  payload:  error.message ,
});

//delete Event actions
export const eraseEvent = id => async dispatch => {
  dispatch(deleteEventBegin());
  try {
    const response = await deleteEvent(id);
    dispatch(deleteEventSuccess(response));
    fetchEvents()
  } catch (error) {
    dispatch(deleteEventFailure(error));
  }
};
const deleteEventBegin = () => ({
  type: DELETE_EVENT_BEGIN,
});
const deleteEventSuccess = event => ({
  type: DELETE_EVENT_SUCCESS,
  payload: event._id,
});
const deleteEventFailure = error => ({
  type: DELETE_EVENT_FAILURE,
  payload: error.message,
});
