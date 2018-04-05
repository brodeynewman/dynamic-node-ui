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

export function editFactory(id, newName) {
  return {
    type: 'EDIT_FACTORY',
    payload: {
      id,
      newName,
    },
  };
}

export function addChildren(childOptions) {
  return {
    type: 'ADD_CHILDREN',
    payload: childOptions,
  };
}
