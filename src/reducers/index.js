import { combineReducers } from 'redux';

import session from './session-reducer';
import { divaReducer as diva } from '../diva-react';

const rootReducer = combineReducers({
  session,
  diva,
});

export default rootReducer;
