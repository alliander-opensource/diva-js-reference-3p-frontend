import { combineReducers } from 'redux';
import {
  REQUEST_SESSION,
  RECEIVE_SESSION,
  REQUEST_POLICIES,
  RECEIVE_POLICIES,
  REQUEST_DELETE_POLICY,
  POLICY_DELETED,
} from '../actions';

function user(
  state = {
    isFetching: false,
    sessionId: '',
    attributes: {},
  },
  action,
) {
  switch (action.type) {
    case REQUEST_SESSION:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_SESSION:
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        sessionId: action.sessionId,
        attributes: action.attributes,
      });
    default:
      return state;
  }
}

function policies(
  state = {
    isFetching: false,
    policies: [],
  },
  action,
) {
  switch (action.type) {
    case REQUEST_POLICIES:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    case RECEIVE_POLICIES:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        policies: action.policies,
      });
    case REQUEST_DELETE_POLICY:
      const deletingIndex = state.policies.findIndex(p => p.id === action.id);
      state.policies[deletingIndex].isDeleting = true;
      return Object.assign({}, state, {
        ...state,
      });
    case POLICY_DELETED:
      const deletedIndex = state.policies.findIndex(p => p.id === action.id);
      state.policies.splice(deletedIndex, 1);
      return Object.assign({}, state, {
        ...state,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  policies,
});

export default rootReducer;
