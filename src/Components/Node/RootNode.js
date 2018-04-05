import _ from 'lodash';
import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Modal from '../Modal';
import AddFactoryForm from '../Forms/AddFactoryForm';
import toggleModal from '../../redux/actions/modalActions';
import { addFactory } from '../../redux/actions/nodeActions';

/**
 * Factory function to return wrapped dispatched function
 * @param {Object} props - RootNodeContainer props
 * @return {Object}
 */
const nodeFactory = props => ({
  handleSubmit: ({ factory: name }) => {
    props.onAddFactory({
      id: uuid.v4(),
      name: _.upperFirst(name),
      isEditing: false,
    });
    props.onToggleModal(props.modalIsOpen)();
  },
});

const RootNodeContainer = (props) => {
  const {
    onToggleModal,
    modalIsOpen,
    onAddFactory,
  } = props;

  const nodeFactoryObject = nodeFactory(props);

  return (
    <div>
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Root" />
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
          onToggleModal={onToggleModal(modalIsOpen)}
          onSubmit={nodeFactoryObject.handleSubmit}
        />
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onToggleModal: modalState => () => dispatch(toggleModal(modalState)),
  onAddFactory: factory => dispatch(addFactory(factory)),
});

const mapStateToProps = state => ({
  modalIsOpen: state.modalIsOpen,
});

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNodeContainer);

export default connectedComponent;
