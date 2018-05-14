import { put, call, all, takeEvery } from 'redux-saga/effects';

import { types, actions } from '../reducers/session-reducer';
import service from '../services/session-service';

function* getSessionData() {
  try {
    const response = yield call(service.getSessionData);
    if (response.sessionId && response.attributes) {
      yield put(actions.sessionDataReceived(response.sessionId, response.attributes));
    } else {
      // TODO: fail case
    }
  } catch (error) {
    // TODO: fail case
  }
}

function* deauthenticate() {
  try {
    const response = yield call(service.deauthenticate);
    if (response) {
      yield put(actions.getSessionData());
    } else {
      // TODO: fail case
    }
  } catch (error) {
    // TODO: fail case
  }
}

function* sagas() {
  yield all([
    takeEvery(types.GET_SESSION_DATA, getSessionData),
    takeEvery(types.DEAUTHENTICATE, deauthenticate),
  ]);
}

export default sagas;
