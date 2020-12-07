import React from "react";
import { Group, Arrow, Rect } from "react-konva";

const ArrowAnnotation = ({ shapeProps }) => {
  const {
    name,
    x,
    y,
    w,
    h,
    draggable,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    points,
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
        <Arrow
          points={points}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={stroke}
          dashEnabled
          dash={dash}
        />
        <Rect width={w} height={h} fill="transparent" />
      </Group>
    </>
  );
};

export default ArrowAnnotation;
