import React from 'react';
import RootNode from './Node/RootNode';
import FactoryContainer from './Factory/FactoryContainer';

const App = () => (
  <div style={{ fontFamily: 'Khula sans-serif' }}>
    <RootNode />
    <FactoryContainer />
  </div>
);

export default App;
