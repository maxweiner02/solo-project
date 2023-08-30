/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import MenuContainer from './MenuContainer';
import CanvasContainer from './CanvasContainer';

const MainContainer = () => {
  const [nodeList, nodeListState] = useState(0);

  return (
    <div>
      <MenuContainer nodeList={nodeList} nodeListState={nodeListState} />
      <CanvasContainer nodeList={nodeList} nodeListState={nodeListState} />
    </div>
  );
};

export default MainContainer;
