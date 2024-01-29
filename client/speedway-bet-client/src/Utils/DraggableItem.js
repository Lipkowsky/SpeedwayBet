// DraggableItem.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ id, name,bg, boxShadow,textColor, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "ITEM",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li className="pt-5" ref={(node) => ref(drop(node))}>
      <div
        className={`draggable font-bold tracking-tight antialiased hover:subpixel-antialiased space-x-6 border rounded shadow-lg p-2 h-15 w-40 ${boxShadow} ${textColor} ${bg}`}
      >
        <p>{name}</p>
      </div>
    </li>
  );
};

export default DraggableItem;
