/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MapInteractionCSS } from 'react-map-interaction';
import StoryNode from '../Components/StoryNode';

const CanvasContainer = () => {
  const [hoverNode, hoveNodeState] = useState(false);

  return (
    <MapInteractionCSS
      showControls
      defaultValue={{
        scale: 1,
        translation: { x: -5000, y: -5000 },
      }}
      minScale={0.75}
      maxScale={1.5}
      translationBounds={{
        xMin: -2250,
        xMax: -10,
        yMin: -3500,
        yMax: -10,
      }}
      disablePan={hoverNode}
    >
      <div id="canvas">
        <StoryNode hoverNode={hoverNode} hoverNodeState={hoveNodeState} />
      </div>
    </MapInteractionCSS>
  );
};

export default CanvasContainer;
