/* eslint-disable react/function-component-definition */
import React from 'react';

const MenuContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { nodeList, nodeListState } = props;

  const clickHelper = () => {
    let temp = nodeList;
    temp += 1;
    nodeListState(temp);
  };

  return (
    <div className="menu">
      <button id="addNode" type="button" onClick={() => { clickHelper(); }}>Add Story Node</button>
      <button id="saveNodes" type="submit">Save All Nodes</button>
    </div>
  );
};

export default MenuContainer;
