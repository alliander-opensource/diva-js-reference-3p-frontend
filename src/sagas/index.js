import { all } from 'redux-saga/effects';
import { divaSaga } from 'diva-react';

import appSaga from './app-saga';
import sessionSaga from './session-saga';

const baseUrl = `${window.env.baseUrl}/api`;

export default function* rootSaga() {
  yield all([
    appSaga(),
    sessionSaga(baseUrl),
    divaSaga(baseUrl),
  ]);
}
