import { all } from 'redux-saga/effects';

import appSaga from './app-saga';
import sessionSaga from './session-saga';
import { divaSaga } from '../diva-react';

const baseUrl = `${window.env.baseUrl}/api`;

export default function* rootSaga() {
  yield all([
    appSaga(),
    sessionSaga(baseUrl),
    divaSaga(baseUrl),
  ]);
}
