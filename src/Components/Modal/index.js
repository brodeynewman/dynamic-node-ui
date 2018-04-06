import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

/**
 * Custom modal styles since Modal takes a style object
 */
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 25,
  },
};

/**
 * ModalComponent stateless Component
 * @param {Object} props - Component props
 * @returns {JSX}
 */
const ModalComponent = (props) => {
  const {
    modalIsOpen,
    onCloseModal,
    customStyles = customModalStyles,
    children,
  } = props;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

ModalComponent.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  customStyles: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node.isRequired,
};

ModalComponent.defaultProps = {
  customStyles: customModalStyles,
};

export default ModalComponent;
