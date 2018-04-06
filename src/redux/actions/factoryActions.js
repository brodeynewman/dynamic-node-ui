/**
 * Adds a factory
 * @param {Object} factory object
 * @returns {Object}
 */
export function addFactory(factory) {
  return {
    type: 'ADD_FACTORY',
    payload: factory,
  };
}

/**
 * Deletes a factory
 * @param {string} id - factory mongo id
 * @returns {Object}
 */
export function deleteFactory(id) {
  return {
    type: 'DELETE_FACTORY',
    payload: id,
  };
}

/**
 * Edits a factory
 * @param {Object} factory object
 * @returns {Object}
 */
export function editFactory(factory) {
  return {
    type: 'EDIT_FACTORY',
    payload: factory,
  };
}

/**
 * Adds children to a factory
 * @param {Object} childOptions - the children array
 * @returns {Object}
 */
export function addChildren(childOptions) {
  return {
    type: 'ADD_CHILDREN',
    payload: childOptions,
  };
}

/**
 * Adds all factories
 * @param {array} factories - factory array
 * @returns {Object}
 */
export function addAllFactories(factories) {
  return {
    type: 'ADD_ALL_FACTORIES',
    payload: factories,
  };
}

/**
 * Async actions
 */

/**
 * Adds a factory
 * @param {Object} client - socket client
 * @param {Object} factory - factory object
 * @returns {function}
 */
export function addFactoryWithSocket(client, factory) {
  return () => {
    client.emit('addFactory', JSON.stringify(factory));
  };
}

/**
 * Updates a factory
 * @param {Object} client - socket client
 * @param {Object} factory - factory object
 * @returns {function}
 */
export function updateFactoryWithSocket(client, factory) {
  return () => {
    client.emit('updateFactory', JSON.stringify(factory));
  };
}

/**
 * Deletes a factory
 * @param {Object} client - socket client
 * @param {string} id - factory mongo id
 * @returns {function}
 */
export function deleteFactoryWithSocket(client, id) {
  return () => {
    client.emit('deleteFactory', id);
  };
}
