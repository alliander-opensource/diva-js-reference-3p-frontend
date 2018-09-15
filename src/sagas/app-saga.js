import { put, all, takeEvery } from 'redux-saga/effects';

import { types as divaTypes, actions } from 'diva-react';

function* onPollResult(action) {
  if (action.data.serverStatus === 'CONNECTED') {
    yield put(actions.abandonIrmaSession(action.viewId, action.irmaSessionId));
    yield put(actions.startIrmaSession(action.viewId, 'ISSUE', { credentialsType: 'FIELDLAB' }));
  }
}

function* onSessionCompleted(action) {
  if (action.data.serverStatus === 'NOT_FOUND') {
    yield put(actions.abandonIrmaSession(action.viewId, action.irmaSessionId));
    yield put(actions.startIrmaSession(action.viewId, 'ISSUE', { credentialsType: 'FIELDLAB' }));
  }
}

function* sagas() {
  yield all([
    takeEvery(divaTypes.PROCESS_POLL_SUCCESS, onPollResult), // Scanned
    takeEvery(divaTypes.SESSION_COMPLETED, onSessionCompleted), // Timeout
  ]);
}

export default sagas;
