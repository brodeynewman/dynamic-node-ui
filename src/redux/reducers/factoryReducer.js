import _ from 'lodash';

export default function factoryReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FACTORY':
      return [
        ...state,
        action.payload,
      ];
    case 'DELETE_FACTORY':
      return _.filter(state, factory => factory._id !== action.payload);
    case 'EDIT_FACTORY':
      return _.map(state, factory => (
        factory._id === action.payload._id
          ? { ...action.payload }
          : factory));
    case 'ADD_CHILDREN':
      return _.map(state, factory => (
        factory._id === action.payload.id
          ? { ...action.payload }
          : factory));
    case 'ADD_ALL_FACTORIES':
      return action.payload;
    default:
      return state;
  }
}
