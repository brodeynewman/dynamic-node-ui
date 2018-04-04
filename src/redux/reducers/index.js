import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './modalReducer';
import factoryReducer from './factoryReducer';

const rootReducer = combineReducers({
  modalIsOpen: modalReducer,
  form: formReducer,
  factories: factoryReducer,
});

export default rootReducer;
