/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { MapInteractionCSS } from 'react-map-interaction';
import StoryNode from '../Components/StoryNode';

const CanvasContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { nodeList, nodeListState } = props;

  const [hoverNode, hoveNodeState] = useState(false);
  const [savedNodes, savedNodesState] = useState([]);

  const curNodeList = [];

  useEffect(() => {
    const saveNodes = [];
    fetch('http://localhost:3000/load')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((element, i) => {
          saveNodes.push(<StoryNode hoverNode={hoverNode} hoverNodeState={hoveNodeState} id={`note${i}`} multiplier={i * -245} text={element.text} title={element.title} posX={element.locationX} posY={element.locationY} />);
        });
        savedNodesState(saveNodes);
        nodeListState(saveNodes.length);
      })
      .catch((err) => console.error(err));
  }, []);

  for (let i = savedNodes.length; i < nodeList; i += 1) {
    console.log(savedNodes);
    curNodeList.push(
      <StoryNode hoverNode={hoverNode} hoverNodeState={hoveNodeState} id={`note${i}`} multiplier={i * -245} />,
    );
  }

  return (
    <div id="canvas">
      {savedNodes}
      {curNodeList}
    </div>
  );
};

export default CanvasContainer;
