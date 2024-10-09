// rootReducer.js

import { combineReducers } from 'redux';
import loginreducer from './loginreducers';

const rootReducer = combineReducers({
    login: loginreducer,
});

export default rootReducer;
