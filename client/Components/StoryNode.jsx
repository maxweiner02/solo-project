/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Draggable from 'react-draggable';

const StoryNode = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    hoverNodeState,
    multiplier,
    title,
    text,
    posX,
    posY,
  } = props;

  const startHover = () => {
    hoverNodeState(true);
  };

  const endHover = () => {
    hoverNodeState(false);
  };

  const saveHelper = (event) => {
    console.log(event);
    const text = event.target.offsetParent.children[1].value;
    const title = event.target.offsetParent.children[0].value;
    const locationX = event.pageX;
    const locationY = event.pageY;
    const request = {
      title,
      text,
      locationX,
      locationY,
    };
    fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const deleteHelper = (event) => {
    const title = event.target.offsetParent.children[0].value;
    const parent = event.target.offsetParent;
    parent.style.display = 'none';
    fetch('http://localhost:3000/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{
        x: posX - 110 || ((window.screen.width / 2) - 200),
        y: posY - 209 || ((window.screen.height / 2) + multiplier - 200),
      }}
    >
      <div className="storyNode" onMouseEnter={() => startHover()} onMouseLeave={() => endHover()}>
        <input type="text" className="titleContent" defaultValue={title || ''} />
        <textarea className="noteContent" defaultValue={text || ''} />
        <div className="buttonContainer">
          <button type="submit" className="saveButton" onClick={(event) => saveHelper(event)}>Save</button>
          <button type="button" className="editButton" onClick={(event) => deleteHelper(event)}>Delete</button>
        </div>
      </div>
    </Draggable>
  );
};

export default StoryNode;
