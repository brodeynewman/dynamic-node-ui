import React from 'react';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Factory from './Factory';
import io from '../../socket';
import {
  addAllFactories,
  addFactory,
  editFactory,
  deleteFactory,
} from '../../redux/actions/factoryActions';

/**
 * Maps factory objects to Factory Components
 * @returns {array}
 */
const mapFactories = fp.map(factory => <Factory key={factory._id} factoryDetails={factory} />);

/**
 * Factory Container Component
 * @extends {React.Component}
 */
class FactoryContainer extends React.Component {
  componentDidMount() {
    // Emit a dummy message to get all factories
    io.emit('allFactories', '');

    io.on('allFactories', this.props.addAllFactories);
    io.on('factoryAdded', this.props.addFactory);
    io.on('factoryUpdated', this.props.editFactory);
    io.on('factoryDeleted', this.props.deleteFactory);
  }

  render() {
    const { factories } = this.props;

    return (
      <div className="pad-box">
        {
          mapFactories(factories)
        }
      </div>
    );
  }
}

FactoryContainer.propTypes = {
  factories: PropTypes.arrayOf(PropTypes.object).isRequired,
  addAllFactories: PropTypes.func.isRequired,
  addFactory: PropTypes.func.isRequired,
  editFactory: PropTypes.func.isRequired,
  deleteFactory: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addAllFactories: factories => dispatch(addAllFactories(factories)),
  addFactory: factory => dispatch(addFactory(factory)),
  editFactory: factory => dispatch(editFactory(factory)),
  deleteFactory: id => dispatch(deleteFactory(id)),
});

const mapStateToProps = ({ factories }) => ({
  factories,
});

export default connect(mapStateToProps, mapDispatchToProps)(FactoryContainer);
