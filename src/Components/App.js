import React from 'react';
import RootNode from './Node/RootNode';
import FactoryContainer from './Factory/FactoryContainer';

/**
 * Root App stateless Component
 * @returns {JSX}
 */
const App = () => (
  <div>
    <RootNode />
    <FactoryContainer />
  </div>
);

export default App;
