/* eslint-disable react/function-component-definition */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MapInteractionCSS } from 'react-map-interaction';

const StoryNode = (props) => {
  // eslint-disable-next-line react/prop-types
  const { hoverNodeState, hoverNode } = props;

  const startHover = () => {
    hoverNodeState(true);
  };

  const endHover = () => {
    hoverNodeState(false);
  };

  return (
    <MapInteractionCSS
      defaultValue={{
        scale: 1,
        translation: { x: 0, y: 0 },
      }}
      minScale={0.75}
      maxScale={1.5}
      disableZoom
      disablePan={!hoverNode}
    >
      <div className="storyNode" onMouseEnter={() => startHover()} onMouseLeave={() => endHover()} />
    </MapInteractionCSS>
  );
};

export default StoryNode;
