import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Modal from '../Modal';
import io from '../../socket';
import AddFactoryForm from '../Forms/AddFactoryForm';
import { addFactoryWithSocket } from '../../redux/actions/factoryActions';

/**
 * Factory function to return wrapped dispatched function
 * @param {Object} props - RootNodeContainer props
 * @return {Object}
 */
const nodeFactory = props => ({
  handleSubmit: ({ factory: name }) => {
    // Passing in the socket client as well
    props.onAddFactory(io, {
      name,
      lowerBound: 0,
      upperBound: 100000,
      numberOfChildren: 11,
    });
    props.onToggleModal();
  },
});

/**
 * RootNodeContainer Component
 * @extends {React.Component}
 */
class RootNodeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.handleToggleModalIsOpen = this.handleToggleModalIsOpen.bind(this);
  }

  /**
   * Handles the toggling of the "modalIsOpen" state
   * @returns {void}
   */
  handleToggleModalIsOpen() {
    return this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));
  }

  render() {
    const { modalIsOpen } = this.state;

    const nodeFactoryObject = nodeFactory({
      ...this.props,
      onToggleModal: this.handleToggleModalIsOpen,
    });

    return (
      <div>
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Root" />
              <RaisedButton
                label="Add Factory"
                primary
                onClick={this.handleToggleModalIsOpen}
              />
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <Modal
          modalIsOpen={modalIsOpen}
          onCloseModal={this.handleToggleModalIsOpen}
        >
          <AddFactoryForm
            onToggleModal={this.handleToggleModalIsOpen}
            onSubmit={nodeFactoryObject.handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

RootNodeContainer.propType = {
  onAddFactory: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAddFactory: (socketClient, factory) => dispatch(addFactoryWithSocket(socketClient, factory)),
});

const connectedComponent = connect(
  _.stubObject,
  mapDispatchToProps,
)(RootNodeContainer);

export default connectedComponent;
