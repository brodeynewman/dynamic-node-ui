import fp from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';
import Factory from './Factory';

const mapFactories = fp.map(factory => <Factory factoryDetails={factory} />);

const FactoryContainer = props => (
  <div className="pad-box">
    {
      mapFactories(props.factories)
    }
  </div>
);

const mapStateToProps = ({ factories }) => ({
  factories,
});

export default connect(mapStateToProps)(FactoryContainer);
