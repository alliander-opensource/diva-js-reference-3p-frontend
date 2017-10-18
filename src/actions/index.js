import fetch from 'isomorphic-fetch';

// action types

export const REQUEST_SESSION = 'get_session';
export const RECEIVE_SESSION = 'update_session';

export function requestSession() {
  return { type: REQUEST_SESSION }
}

function receiveSession(json) {
  return {
    type: RECEIVE_SESSION,
    sessionId: json.user.sessionId,
    attributes: json.user.attributes,
    receivedAt: Date.now(),
  }
}

export function fetchSession() {
  return dispatch => {
    dispatch(requestSession());
    return fetch('/api/get-session', {
        credentials: 'same-origin',
      })
      .then(response => response.json())
      .then(json => dispatch(receiveSession(json)));
  }
}
