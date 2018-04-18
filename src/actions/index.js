import axios from 'axios';

// action types

export const REQUEST_SESSION = 'get_session';
export const RECEIVE_SESSION = 'update_session';
export const DEAUTHENTICATE = 'deauthenticate';

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

export function deauthenticate() {
  return dispatch =>
    axios
      .get('/api/deauthenticate', {
        withCredentials: true,
      })
      .then(() => dispatch(fetchSession()));
}
