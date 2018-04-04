import _ from 'lodash';

export default function factoryReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FACTORY':
      return [
        ...state,
        action.payload,
      ];
    case 'REMOVE_FACTORY':
      return _.filter(state, factory => factory.id !== action.payload);
    default:
      return state;
  }
}
