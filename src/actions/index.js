import axios from 'axios';

// action types

export const REQUEST_SESSION = 'get_session';
export const RECEIVE_SESSION = 'update_session';
export const DEAUTHENTICATE = 'deauthenticate';

export const REQUEST_POLICIES = 'get_policies';
export const RECEIVE_POLICIES = 'update_policies';

export const REQUEST_DELETE_POLICY = 'request_delete_policy';
export const POLICY_DELETED = 'policy_deleted';

export function requestSession() {
  return { type: REQUEST_SESSION };
}

function receiveSession(json) {
  return {
    type: RECEIVE_SESSION,
    sessionId: json.sessionId,
    attributes: json.attributes,
    receivedAt: Date.now(),
  };
}

export function fetchSession() {
  return (dispatch) => {
    dispatch(requestSession());
    return axios
      .get('/api/get-session', {
        withCredentials: true,
      })
      // .then(response => response.json())
      .then(response => response.data)
      .then(json => dispatch(receiveSession(json)));
  };
}

export function getPolicies() {
  return dispatch => {
    dispatch(requestPolicies());
    return axios
      .get('/api/policy/all', {
        withCredentials: true,
      })
      .then(response => response.data)
      .then(json => dispatch(receivePolicies(json)));
  }
}

export function requestPolicies() {
  return { type: REQUEST_POLICIES }
}

function receivePolicies(json) {
  return {
    type: RECEIVE_POLICIES,
    policies: json,
    receivedAt: Date.now(),
  }
}

export function deauthenticate() {
  return dispatch =>
    axios
      .get('/api/deauthenticate', {
        withCredentials: true,
      })
      .then(() => dispatch(fetchSession()));
}

export function requestDeletePolicy(id) {
  return {
    type: REQUEST_DELETE_POLICY,
    id,
  }
}

export function deletePolicy(id) {
  return dispatch => {
    dispatch(requestDeletePolicy(id));
    return axios
      .delete(`/api/policy/${id}`, {
        withCredentials: true,
      })
      .then(response => response.data)
      .then(json => dispatch(policyDeleted(json)));
  }
}

function policyDeleted(json) {
  return {
    type: POLICY_DELETED,
    id: json.id,
    receivedAt: Date.now(),
  }
}
