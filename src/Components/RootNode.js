import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Modal from './Modal';
import AddFactoryForm from './Forms/AddFactoryForm';
import toggleModal from '../redux/actions/modalActions';

const handleSubmit = (values) => {
  console.log('here', values);
};

const RootNodeContainer = (props) => {
  const {
    onToggleModal,
    modalIsOpen,
  } = props;

  return (
    <div>
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Root Node" />
            <RaisedButton
              label="Add Factory"
              primary
              onClick={onToggleModal(modalIsOpen)}
            />
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
      <Modal
        modalIsOpen={modalIsOpen}
        onCloseModal={onToggleModal(modalIsOpen)}
      >
        <AddFactoryForm
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onToggleModal: modalState => () => dispatch(toggleModal(modalState)),
});

const mapStateToProps = state => ({
  modalIsOpen: state.modalIsOpen,
});

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNodeContainer);

export default connectedComponent;
