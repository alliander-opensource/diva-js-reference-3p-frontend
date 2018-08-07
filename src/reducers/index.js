import { combineReducers } from 'redux';

import session from './session-reducer';
import { divaReducer } from '../diva-react';

const rootReducer = combineReducers({
  session,
  divaReducer,
});

export default rootReducer;
