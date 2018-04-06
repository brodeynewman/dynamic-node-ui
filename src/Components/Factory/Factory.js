import _ from 'lodash';
import React from 'react';
import fp from 'lodash/fp';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Modal from '../Modal';
import io from '../../socket';
import FactoryMenu from './FactoryMenu';
import AddChildrenForm from '../Forms/AddChildrenForm';
import {
  deleteFactoryWithSocket,
  updateFactoryWithSocket,
} from '../../redux/actions/factoryActions';

const mapChildren = fp.map(child =>
  <div className="position-relative child pad-box-light text-color-heading margin-left-75">{child.number}</div>);

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
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIsPopoverOpen = this.handleIsPopoverOpen.bind(this);
    this.toggleIsModalOpen = this.toggleIsModalOpen.bind(this);
    this.handleAddChildrenFormSubmit = this.handleAddChildrenFormSubmit.bind(this);
  }

  handleEditChange({ target }) {
    return this.setState({ editValue: target.value });
  }

  handleIsPopoverOpen() {
    return this.setState(prevState => ({ isPopoverOpen: !prevState.isPopoverOpen }));
  }

  toggleIsEditing() {
    return this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  toggleIsModalOpen() {
    return this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  }

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
      return this.toggleIsEditing();
    }

    editFactoryNode(io, _.assign(factoryDetails, { name: editValue }));
    return this.toggleIsEditing();
  }

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
    this.toggleIsModalOpen();
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
          onKeyPress={this.toggleIsEditing}
          onClick={this.toggleIsEditing}
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
                onKeyPress={this.toggleIsEditing}
                className="factory-node cursor-pointer"
                onClick={this.toggleIsEditing}
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
            onToggleIsModalOpen={this.toggleIsModalOpen}
          />
          <Modal
            modalIsOpen={isModalOpen}
            onCloseModal={this.toggleIsModalOpen}
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

const mapDispatchToProps = dispatch => ({
  editFactoryNode: (socketClient, id, newName) =>
    dispatch(updateFactoryWithSocket(socketClient, id, newName)),
  deleteFactory: (socketClient, id) =>
    () => dispatch(deleteFactoryWithSocket(socketClient, id)),
  addChildren: (socketClient, factory) =>
    dispatch(updateFactoryWithSocket(socketClient, factory)),
});

export default connect(_.stubObject, mapDispatchToProps)(Factory);
