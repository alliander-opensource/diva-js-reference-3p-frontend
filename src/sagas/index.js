import { all } from 'redux-saga/effects';
import { divaSaga } from 'diva-react';

const irmaConfig = {
  irmaUrl: 'https://FILL_IN',
  jwtEnabled: false,
  jwtPublicKey: 'FILL_IN',
};


export default function* rootSaga() {
  yield all([
    divaSaga(irmaConfig),
  ]);
}
