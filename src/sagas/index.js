import { all } from 'redux-saga/effects';
import divaSagas from '../diva-react/sagas/diva-saga';

export default function* rootSaga() {
  yield all([
    divaSagas(),
  ]);
}
