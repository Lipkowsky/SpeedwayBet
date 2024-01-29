// DraggableList.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect'; // for detecting mobile devices
import DraggableItem from './DraggableItem';

const backend = isMobile ? TouchBackend : HTML5Backend;

const DraggableList = ({ items, setHelmets }) => {
  const [list, setList] = useState(items);

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = list[dragIndex];
    const updatedList = [...list];
    updatedList.splice(dragIndex, 1);
    updatedList.splice(hoverIndex, 0, draggedItem);
    setList(updatedList);
    setHelmets(updatedList);
  };

  return (
    <DndProvider backend={backend}>
      <ul>
        {list.map((item, index) => (
          <DraggableItem
            key={item.id}
            index={index}
            id={item.id}
            name={item.name}
            bg={item.bg}
            boxShadow={item.boxShadow}
            textColor={item.textColor}
            moveItem={moveItem}
          />
        ))}
      </ul>
    </DndProvider>
  );
};

export default DraggableList;
