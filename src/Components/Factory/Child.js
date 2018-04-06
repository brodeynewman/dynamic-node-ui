import React from 'react';
import PropTypes from 'prop-types';

/**
 * Returns a stateless Child Component
 * @param {number} number - the child number
 * @returns {JSX}
 */
const Child = ({ number }) => (
  <div className="position-relative child pad-box-light text-color-heading margin-left-75">{number}</div>
);

Child.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Child;
