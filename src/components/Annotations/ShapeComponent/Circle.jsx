import React from "react";
import { Group, Circle } from "react-konva";

const CircleAnnotation = ({ shapeProps }) => {
  const {
    name,
    x,
    y,
    draggable,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    radius,
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
        <Circle
          radius={radius}
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

export default CircleAnnotation;
