import { combineReducers } from 'redux';

import session from './session-reducer';
import diva from '../diva-react/reducers/diva-reducer';

const rootReducer = combineReducers({
  session,
  diva,
});

export default rootReducer;
