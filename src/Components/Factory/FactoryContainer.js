import React from 'react';
import fp from 'lodash/fp';
import { connect } from 'react-redux';
import Factory from './Factory';
import io from '../../socket';
import {
  addAllFactories,
  addFactory,
  editFactory,
  deleteFactory,
} from '../../redux/actions/factoryActions';

const mapFactories = fp.map(factory => <Factory key={factory.id} factoryDetails={factory} />);

class FactoryContainer extends React.Component {
  componentDidMount() {
    const {
      addAllFactories,
      addFactory,
      editFactory,
      deleteFactory,
    } = this.props;

    // Emit a dummy message to get all factories
    io.emit('allFactories', '');

    io.on('allFactories', addAllFactories);
    io.on('factoryAdded', addFactory);
    io.on('factoryUpdated', editFactory);
    io.on('factoryDeleted', deleteFactory);
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
