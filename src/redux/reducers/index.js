import { combineReducers } from 'redux';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  modalIsOpen: modalReducer,
});

export default rootReducer;
