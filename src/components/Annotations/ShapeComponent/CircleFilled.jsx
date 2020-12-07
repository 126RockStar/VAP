import React, { useState } from "react";

import { Group, Circle } from "react-konva";

const CircleFilledAnnotation = ({ shapeProps }) => {
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
  } = shapeProps || {};

  const [transformValue, setTransformValue] = useState({
    clipX: x,
    clipY: y,
    clipRadius: radius,
  });

  const onTransform = (event) => {
    const stage = event.target.getStage();
    const selectedNode = stage.findOne(`.${name}`);
    console.log(selectedNode.getClientRect().height);
    setTransformValue({
      clipX: selectedNode.attrs.x,
      clipY: selectedNode.attrs.y,
      clipRadius: selectedNode.getClientRect().height / 2,
    });
  };

  const onDragMove = (event) => {
    const stage = event.target.getStage();
    const selectedNode = stage.findOne(`.${name}`);

    setTransformValue({
      clipX: selectedNode.attrs.x,
      clipY: selectedNode.attrs.y,
      clipRadius: selectedNode.getClientRect().height / 2,
    });
  };

  return (
    <>
      <Group globalCompositeOperation="destination-out">
        <Circle
          x={transformValue.clipX}
          y={transformValue.clipY}
          fill="#555555"
          radius={transformValue.clipRadius}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </Group>
      <Group
        name={name}
        x={x}
        y={y}
        draggable={draggable}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTransform={onTransform}
        onDragMove={onDragMove}
      >
        <Circle
          radius={radius}
          // fill={stroke}
          fill="transparent"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </Group>
    </>
  );
};

export default CircleFilledAnnotation;
