import React from 'react';
import Modal from 'react-modal';

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

const ModalComponent = (props) => {
  const {
    modalIsOpen,
    afterOpenModal,
    onCloseModal,
    customStyles = customModalStyles,
  } = props;

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {props.children}
    </Modal>
  );
};

export default ModalComponent;
