import _ from 'lodash';

export default function factoryReducer(state = [{ name: 'test', id: 1 }], action) {
  switch (action.type) {
    case 'ADD_FACTORY':
      return [
        ...state,
        action.payload,
      ];
    case 'REMOVE_FACTORY':
      return _.filter(state, factory => factory.id !== action.payload);
    case 'EDIT_FACTORY':
      return _.map(state, factory => (
        factory.id === action.payload.id
          ? { ...factory, name: action.payload.newName }
          : factory));
    case 'ADD_CHILDREN':
      return _.map(state, factory => (
        factory.id === action.payload.id
          ? { ...action.payload }
          : factory));
    default:
      return state;
  }
}
