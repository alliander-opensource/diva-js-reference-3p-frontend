import { all } from 'redux-saga/effects';
import { divaSaga } from 'diva-react';

const irmaConfig = {
  irmaUrl: window.env.irmaUrl,
  jwtEnabled: window.env.jwtEnabled,
  jwtPublicKey: window.env.jwtPublicKey,
  irmaBackendStartUrl: window.env.irmaBackendStartUrl,
  irmaBackendProofUrl: window.env.irmaBackendProofUrl,
};


export default function* rootSaga() {
  yield all([
    divaSaga(irmaConfig),
  ]);
}
