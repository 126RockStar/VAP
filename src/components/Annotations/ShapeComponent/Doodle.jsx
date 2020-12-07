import React from "react";
import { Group, Text, Circle, Line, Rect } from "react-konva";

const DoodleAnnotation = ({ shapeProps }) => {
  const {
    name,
    x,
    y,
    width,
    height,
    draggable,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onDoodleEditText,
    text,
    stroke,
    strokeWidth,
    hide,
    textPositionY,
    dash,
  } = shapeProps || {};

  const textWidth = 2.5 * Number(Math.sqrt(width ** 2 + height ** 2));

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
        onDblClick={(e) => onDoodleEditText(e, width, height, textWidth)}
      >
        <Group name="shape">
          <Group>
            <Circle radius={3} fill={stroke} />
            <Circle radius={10} fill={stroke} opacity={0.3} />
          </Group>
          <Group>
            <Line
              points={[0, 0, width, height]}
              stroke={stroke}
              strokeWidth={strokeWidth}
              dashEnabled
              dash={dash}
            />
            <Line
              points={[width, height, width + textWidth, height]}
              stroke={stroke}
              strokeWidth={strokeWidth}
              dashEnabled
              dash={dash}
            />
            <Rect width={width + textWidth} height={height} />
          </Group>
        </Group>
        {!hide && (
          <Text
            x={width + 5}
            y={textPositionY}
            text={text}
            fontSize={14}
            fontFamily="Calibri"
            fill={stroke}
            strokeWidth={2}
            padding={0}
            width={textWidth}
          />
        )}
      </Group>
    </>
  );
};

export default DoodleAnnotation;
