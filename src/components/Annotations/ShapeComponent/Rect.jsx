import React from "react";
import { Group, Rect } from "react-konva";

const RectAnnotation = ({ shapeProps }) => {
  const {
    name,
    x,
    y,
    draggable,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    width,
    height,
    stroke,
    strokeWidth,
    dash,
  } = shapeProps || {};

  return (
    <>
      <Group
        name={name}
        x={x}
        y={y}
        draggable={draggable}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Rect
          width={width}
          height={height}
          fill="transparent"
          stroke={stroke}
          strokeWidth={strokeWidth}
          dashEnabled
          dash={dash}
        />
      </Group>
    </>
  );
};

export default RectAnnotation;
