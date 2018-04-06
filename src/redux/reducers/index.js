import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import factoryReducer from './factoryReducer';

/**
 * Root Reducer
 */
const rootReducer = combineReducers({
  form: formReducer,
  factories: factoryReducer,
});

export default rootReducer;
