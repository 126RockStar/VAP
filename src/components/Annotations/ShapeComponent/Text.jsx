import React from "react";
import { Group, Text } from "react-konva";

const TextAnnotation = ({ shapeProps }) => {
  const {
    name,
    x,
    y,
    w,
    draggable,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onEditText,
    text,
    stroke,
    hide,
  } = shapeProps || {};

  return (
    <>
      {!hide && (
        <Group
          name={name}
          x={x}
          y={y}
          draggable={draggable}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onDblClick={onEditText}
        >
          <Text
            text={text}
            fontSize={15}
            fontFamily="Calibri"
            fill={stroke}
            strokeWidth={2}
            padding={0}
            width={w}
          />
        </Group>
      )}
    </>
  );
};

export default TextAnnotation;
