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

export function editFactory(factory) {
  return {
    type: 'EDIT_FACTORY',
    payload: factory,
  };
}

export function addChildren(childOptions) {
  return {
    type: 'ADD_CHILDREN',
    payload: childOptions,
  };
}

/**
 * Async actinos
 */
export function addAllFactories(factories) {
  return {
    type: 'ADD_ALL_FACTORIES',
    payload: factories,
  };
}

export function addFactoryWithSocket(client, factory) {
  return () => {
    client.emit('addFactory', JSON.stringify(factory));
  };
}

export function updateFactoryWithSocket(client, factory) {
  return () => {
    client.emit('updateFactory', JSON.stringify(factory));
  };
}
