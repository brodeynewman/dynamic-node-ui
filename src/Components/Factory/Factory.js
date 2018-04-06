import _ from 'lodash';
import uuid from 'uuid';
import React from 'react';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Child from './Child';
import Modal from '../Modal';
import io from '../../socket';
import FactoryMenu from './FactoryMenu';
import AddChildrenForm from '../Forms/AddChildrenForm';
import {
  deleteFactoryWithSocket,
  updateFactoryWithSocket,
} from '../../redux/actions/factoryActions';

/**
 * Maps children to a child div
 * @returns {array}
 */
const mapChildren = fp.map(({ number, id }) => <Child key={id} number={number} />);

/**
 * Factory Component
 * @extends {React.Component}
 */
class Factory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editValue: props.factoryDetails.name,
      isEditing: false,
      isPopoverOpen: false,
      isModalOpen: false,
    };

    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleToggleIsEditing = this.handleToggleIsEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIsPopoverOpen = this.handleIsPopoverOpen.bind(this);
    this.handleToggleIsModalOpen = this.handleToggleIsModalOpen.bind(this);
    this.handleAddChildrenFormSubmit = this.handleAddChildrenFormSubmit.bind(this);
  }

  /**
   * Sets the target value of the factory name
   * @param {Object} target - event target
   * @returns {void}
   */
  handleEditChange({ target }) {
    return this.setState({ editValue: target.value });
  }

  /**
   * Toggles the state of the edit/delete popover
   * @returns {void}
   */
  handleIsPopoverOpen() {
    return this.setState(prevState => ({ isPopoverOpen: !prevState.isPopoverOpen }));
  }

  /**
   * Toggles the "isEditing" state for factory name edit
   * @returns {void}
   */
  handleToggleIsEditing() {
    return this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  /**
   * Toggles the modal state
   * @returns {void}
   */
  handleToggleIsModalOpen() {
    return this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  }

  /**
   * Handles the "Add Factory" form submission
   * @param {Object} e - event object
   * @returns {void}
   */
  handleSubmit(e) {
    e.preventDefault();

    const { editValue } = this.state;
    const { editFactoryNode, factoryDetails } = this.props;
    const { name } = this.props.factoryDetails;

    /**
     * If a user tries to empty the input,
     * Reset it to the original value
     */
    if (editValue === '') {
      this.handleEditChange({ target: { value: name } });
      return this.handleToggleIsEditing();
    }

    editFactoryNode(io, _.assign(factoryDetails, { name: editValue }));
    return this.handleToggleIsEditing();
  }

  /**
   * Handles the children adding / editing
   * @param {Object} values - the form values from the "Edit Factory" modal
   * @returns {void}
   */
  handleAddChildrenFormSubmit(values) {
    const {
      numberOfChildren,
      lowerBound,
      upperBound,
    } = values;
    const { addChildren } = this.props;
    const { _id, name } = this.props.factoryDetails;

    const arrayOfChildrenAmount = new Array(Number(numberOfChildren));

    /** Loop through and create a random number */
    const arrayOfChildren = _.map(arrayOfChildrenAmount, () => ({
      id: uuid.v4(),
      number: Math.floor(Math.random(Number(lowerBound)) * Number(upperBound)),
    }));

    addChildren(io, {
      numberOfChildren,
      name,
      _id,
      lowerBound,
      upperBound,
      children: arrayOfChildren,
    });
    return this.handleToggleIsModalOpen();
  }

  render() {
    const {
      _id,
      name,
      children = [],
    } = this.props.factoryDetails;
    const { deleteFactory } = this.props;
    const {
      editValue,
      isEditing,
      isPopoverOpen,
      isModalOpen,
    } = this.state;

    return (
      <MuiThemeProvider>
        <div
          role="presentation"
          onKeyPress={this.handleToggleIsEditing}
          onClick={this.handleToggleIsEditing}
          className={`${isEditing ? 'display-block' : 'display-none'} menu-overlay`}
        />
        <div className="pad-box-light display-flex align-items-center">
          {
            isEditing
            ? (
              <form className="max-z-index" onSubmit={this.handleSubmit}>
                <input
                  autoFocus
                  className="pad-box-light border-solid-light"
                  onChange={this.handleEditChange}
                  value={editValue}
                />
              </form>
            ) : (
              <span
                role="presentation"
                onKeyPress={this.handleToggleIsEditing}
                className="factory-node cursor-pointer"
                onClick={this.handleToggleIsEditing}
              >
                <b>{name}</b>
              </span>
            )
          }
          <IconButton
            style={{ width: 20, padding: 0, marginLeft: 10 }}
            onClick={this.handleIsPopoverOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <FactoryMenu
            isPopoverOpen={isPopoverOpen}
            onDeleteFactory={deleteFactory(io, _id)}
            onToggleIsModalOpen={this.handleToggleIsModalOpen}
          />
          <Modal
            modalIsOpen={isModalOpen}
            onCloseModal={this.handleToggleIsModalOpen}
          >
            <AddChildrenForm
              onSubmit={this.handleAddChildrenFormSubmit}
              {...this.props.factoryDetails}
            />
          </Modal>
        </div>
        <ul className="pad-box margin-left-10 margin-bottom-0">
          {
            mapChildren(children)
          }
        </ul>
      </MuiThemeProvider>
    );
  }
}

Factory.propTypes = {
  editFactoryNode: PropTypes.func.isRequired,
  addChildren: PropTypes.func.isRequired,
  deleteFactory: PropTypes.func.isRequired,
  factoryDetails: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
    lowerBound: PropTypes.number,
    upperBound: PropTypes.number,
  })).isRequired,
};

const mapDispatchToProps = dispatch => ({
  editFactoryNode: (socketClient, id, newName) =>
    dispatch(updateFactoryWithSocket(socketClient, id, newName)),
  deleteFactory: (socketClient, id) =>
    () => dispatch(deleteFactoryWithSocket(socketClient, id)),
  addChildren: (socketClient, factory) =>
    dispatch(updateFactoryWithSocket(socketClient, factory)),
});

export default connect(_.stubObject, mapDispatchToProps)(Factory);
