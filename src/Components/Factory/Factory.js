import _ from 'lodash';
import React from 'react';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { editFactory, removeFactory } from '../../redux/actions/nodeActions';

class Factory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editValue: props.name,
      isEditing: false,
      isPopoverOpen: false,
    };

    this.handleEditChange = this.handleEditChange.bind(this);
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIsPopoverOpen = this.handleIsPopoverOpen.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    const { editValue } = this.state;
    const { id, editFactoryNode } = this.props;

    editFactoryNode(id, editValue);
    this.toggleIsEditing();
  }

  render() {
    const {
      id,
      name,
      removeFactory,
    } = this.props;
    const { editValue, isEditing, isPopoverOpen } = this.state;

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
                {name}
              </span>
            )
          }
          <IconButton
            style={{ width: 20, padding: 0, marginLeft: 10 }}
            onClick={this.handleIsPopoverOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <span className={`${isPopoverOpen ? 'node-menu-show' : 'node-menu-hide'} margin-left-5 border-solid-light display-flex node-menu`}>
            <span className="pad-left-10 cursor-pointer pad-box-light text-color-material-green display-flex justify-content-center align-items-center ">
              <FA
                className="text-color-material-green"
                name="fas fa-plus"
              />
            </span>
            <span
              role="presentation"
              onKeyPress={removeFactory(id)}
              onClick={removeFactory(id)}
              className="cursor-pointer pad-box-light display-flex justify-content-center align-items-center "
            >
              <FA
                className="text-color-material-green cursor-pointer pad-box-light"
                name="fas fa-trash"
              />
            </span>
          </span>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editFactoryNode: (id, newName) => dispatch(editFactory(id, newName)),
  removeFactory: id => () => dispatch(removeFactory(id)),
});

export default connect(_.stubObject, mapDispatchToProps)(Factory);
