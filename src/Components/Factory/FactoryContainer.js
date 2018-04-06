import React from 'react';
import fp from 'lodash/fp';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Factory from './Factory';
import { SOCKET_CONNECTION } from '../../config';
import { addAllFactories } from '../../redux/actions/factoryActions';

const mapFactories = fp.map(factory => <Factory key={factory.id} factoryDetails={factory} />);

class FactoryContainer extends React.Component {
  componentDidMount() {
    const socket = io.connect('http://localhost:8008');

    // Emit a dummy message to get all factories
    socket.emit('allFactories', '');

    socket.on('allFactories', this.props.addAllFactories);

    console.log(this.props);
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
});

const mapStateToProps = ({ factories }) => ({
  factories,
});

export default connect(mapStateToProps, mapDispatchToProps)(FactoryContainer);
