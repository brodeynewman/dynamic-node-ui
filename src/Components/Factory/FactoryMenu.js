import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

/**
 * FactoryMenu stateless Component
 * @param {Object} props - Component props
 * @returns {JSX}
 */
const FactoryMenu = (props) => {
  const { onDeleteFactory, isPopoverOpen, onToggleIsModalOpen } = props;

  return (
    <span className={`${isPopoverOpen ? 'node-menu-show' : 'node-menu-hide'} margin-left-5 border-solid-light display-flex node-menu`}>
      <span
        role="presentation"
        onKeyPress={onToggleIsModalOpen}
        onClick={onToggleIsModalOpen}
        className="pad-left-10 cursor-pointer pad-box-light text-color-material-green display-flex justify-content-center align-items-center "
      >
        <FA
          className="text-color-material-green"
          name="fas fa-plus"
        />
      </span>
      <span
        role="presentation"
        onKeyPress={onDeleteFactory}
        onClick={onDeleteFactory}
        className="cursor-pointer pad-box-light display-flex justify-content-center align-items-center "
      >
        <FA
          className="text-color-firebrick cursor-pointer pad-box-light"
          name="fas fa-trash"
        />
      </span>
    </span>
  );
};

FactoryMenu.propTypes = {
  onDeleteFactory: PropTypes.func.isRequired,
  isPopoverOpen: PropTypes.bool.isRequired,
  onToggleIsModalOpen: PropTypes.func.isRequired,
};

export default FactoryMenu;

