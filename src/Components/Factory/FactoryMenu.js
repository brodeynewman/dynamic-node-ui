import React from 'react';
import FA from 'react-fontawesome';

const FactoryMenu = (props) => {
  const { onRemoveFactory, isPopoverOpen, onToggleIsModalOpen } = props;

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
        onKeyPress={onRemoveFactory}
        onClick={onRemoveFactory}
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

export default FactoryMenu;

