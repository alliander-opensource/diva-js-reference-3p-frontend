import { all } from 'redux-saga/effects';
import { divaSaga } from 'diva-react';

const irmaServer = 'https://POINT_TO_IRMA_SERVER';

export default function* rootSaga() {
  yield all([
    divaSaga(irmaServer),
  ]);
}
