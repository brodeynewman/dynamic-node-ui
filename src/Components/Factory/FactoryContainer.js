import fp from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';
import Factory from './Factory';

const mapFactories = fp.map(factory => <Factory {...factory} />);

const FactoryContainer = (props) => {
  console.log('here', props);

  return (
    <div>
      {
        mapFactories(props.factories)
      }
    </div>
  );
};

const mapStateToProps = ({ factories }) => ({
  factories,
});

export default connect(mapStateToProps)(FactoryContainer);
