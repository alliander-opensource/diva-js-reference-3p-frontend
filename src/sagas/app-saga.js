import { put, all, takeEvery } from 'redux-saga/effects';

import { types as divaTypes, actions } from 'diva-react';

function* onPollResult(action) {
  if (action.data.serverStatus === 'CONNECTED') {
    yield put(actions.abandonIrmaSession(action.viewId, action.irmaSessionId));
    yield put(actions.startIrmaSession(action.viewId, 'ISSUE', { credentialType: 'FIELDLAB' }));
  }
}

function* onSessionCompleted(action) {
  // For robustness, always start a new session
  yield put(actions.abandonIrmaSession(action.viewId, action.irmaSessionId));
  yield put(actions.startIrmaSession(action.viewId, 'ISSUE', { credentialType: 'FIELDLAB' }));
}

function* sagas() {
  yield all([
    takeEvery(divaTypes.PROCESS_POLL_SUCCESS, onPollResult), // Scanned
    takeEvery(divaTypes.SESSION_COMPLETED, onSessionCompleted), // Timeout
  ]);
}

export default sagas;
