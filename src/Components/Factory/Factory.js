import React from 'react';

const Factory = (props) => {
  console.log(props);

  return (
    <div>
      {props.name}
    </div>
  );
};

export default Factory;
