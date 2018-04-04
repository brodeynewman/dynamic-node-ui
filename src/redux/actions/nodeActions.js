export function addFactory(factory) {
  return {
    type: 'ADD_FACTORY',
    payload: factory,
  };
}

export function removeFactory(id) {
  return {
    type: 'REMOVE_FACTORY',
    payload: id,
  };
}
