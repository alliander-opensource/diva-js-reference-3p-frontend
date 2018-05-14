export const types = {
  GET_SESSION_DATA: 'SESSION/GET_SESSION_DATA',
  SESSION_DATA_RECEIVED: 'SESSION/SESSION_DATA_RECEIVED',
  DEAUTHENTICATE: 'SESSION/DEAUTHENTICATE',
};

export const initialState = {
  isFetching: false,
  sessionId: null,
  attributes: {},
};

export const actions = {
  getSessionData: () => ({
    type: types.GET_SESSION_DATA,
  }),
  sessionDataReceived: (sessionId, attributes) => ({
    type: types.SESSION_DATA_RECEIVED,
    sessionId,
    attributes,
    receivedAt: Date.now(),
  }),
  // TODO: getSessionDataFailed
  deauthenticate: () => ({
    type: types.DEAUTHENTICATE,
  }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SESSION_DATA:
      return {
        ...state,
        isFetching: true,
      };
    case types.SESSION_DATA_RECEIVED:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
        sessionId: action.sessionId,
        attributes: action.attributes,
      };
    default:
      return state;
  }
};
