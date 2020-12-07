import React from "react";
import { Group, Shape, Rect, Arrow } from "react-konva";

const CurveAnnotation = ({ shapeProps }) => {
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
    stroke,
    strokeWidth,
    dash,
  } = shapeProps || {};

  const bezier = {
    start: { x: 0, y: 0 },
    control1: { x: 30, y: h },
    control2: { x: w - 30, y: h },
    end: { x: w, y: 0 },
  };

  const getArrowDirection = () => {
    const tanAlpha = h / 30;
    const arrowX = bezier.end.x + 1;
    const arrowY = -(1 * tanAlpha);

    return {
      arrowX,
      arrowY,
    };
  };
  getArrowDirection();
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
        <Rect width={bezier.end.x} height={h} fill={stroke} opacity={0} />
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.bezierCurveTo(
              bezier.control1.x,
              bezier.control1.y,
              bezier.control2.x,
              bezier.control2.y,
              bezier.end.x,
              bezier.end.y
            );
            context.fillStrokeShape(shape);
          }}
          stroke={stroke}
          strokeWidth={strokeWidth}
          dashEnabled
          dash={dash}
        />
        <Arrow
          points={[
            bezier.end.x,
            bezier.end.y,
            getArrowDirection().arrowX,
            getArrowDirection().arrowY,
          ]}
          stroke={stroke}
          fill={stroke}
          strokeWidth={strokeWidth}
        />
      </Group>
    </>
  );
};

export default CurveAnnotation;
