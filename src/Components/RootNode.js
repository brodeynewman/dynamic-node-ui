import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import toggleModal from '../redux/actions/modalActions';
import Modal from './Modal';

const RootNodeContainer = (props) => {
  const {
    onToggleModal,
    modalIsOpen,
  } = props;

  console.log(modalIsOpen);

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
        <div>hellothere</div>
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
