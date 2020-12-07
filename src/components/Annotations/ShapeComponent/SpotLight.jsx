import React, { useState } from "react";
import { Group, Ellipse, Shape } from "react-konva";
import ImageFromUrl from "../ImageFromUrl";
import wrestlingImage from "../../../images/2016-Wrestling-World-Cup-2.jpg";

const SpotLightAnnotation = ({ shapeProps }) => {
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
    stroke,
    strokeWidth,
  } = shapeProps || {};

  const [transformValue, setTransformValue] = useState({
    clipX: x,
    clipY: y,
    clipWidth: width,
    clipHeight: height,
  });

  const onTransform = (event) => {
    const stage = event.target.getStage();
    const selectedNode = stage.findOne(`.${name}`);
    setTransformValue({
      clipX: selectedNode.attrs.x,
      clipY: selectedNode.attrs.y,
      clipWidth: selectedNode.getClientRect().width / 2,
      clipHeight: selectedNode.getClientRect().height / 2,
    });
  };

  const onDragMove = (event) => {
    const stage = event.target.getStage();
    const selectedNode = stage.findOne(`.${name}`);
    setTransformValue({
      clipX: selectedNode.attrs.x,
      clipY: selectedNode.attrs.y,
      clipWidth: selectedNode.getClientRect().width / 2,
      clipHeight: selectedNode.getClientRect().height / 2,
    });
  };

  return (
    <>
      <Group globalCompositeOperation={"destination-out"}>
        <Group name="spotlight-top">
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.lineTo(
                transformValue.clipX -
                  transformValue.clipWidth +
                  (transformValue.clipWidth / 2 + transformValue.clipWidth / 3),
                transformValue.clipY - 700
              );
              context.lineTo(
                transformValue.clipX +
                  transformValue.clipWidth -
                  (transformValue.clipWidth / 2 + transformValue.clipWidth / 3),
                transformValue.clipY - 700
              );
              context.lineTo(
                transformValue.clipX + transformValue.clipWidth,
                transformValue.clipY
              );
              context.lineTo(
                transformValue.clipX - transformValue.clipWidth,
                transformValue.clipY
              );
              context.fillStrokeShape(shape);
            }}
            fill={"#555555"}
          />
        </Group>
        <Group name="spotlight-bottom">
          <Ellipse
            x={transformValue.clipX}
            y={transformValue.clipY}
            radiusX={transformValue.clipWidth}
            radiusY={transformValue.clipHeight}
            fill={"#555555"}
          />
        </Group>
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
        <Group name="spotlight-top">
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              // there is context.lineTo, context.arc but no context.ellipse
              context.lineTo(0 - width + (width / 2 + width / 3), -700);
              context.lineTo(width - (width / 2 + width / 3), -700);
              context.lineTo(width, 0);
              context.lineTo(0 - width, 0);

              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            fillLinearGradientStartPoint={{ x: 0, y: -500 }}
            fillLinearGradientEndPoint={{ x: 0, y: 0 }}
            fillLinearGradientColorStops={[0.5, stroke, 1, "white"]}
            opacity={0.3}
          />
          <Group
            clipFunc={(ctx) => {
              ctx.rect(0 - width, 0, width, height);
              ctx.rect(0, 0, width, height);
            }}
          >
            <Ellipse
              radiusX={width}
              radiusY={height}
              fill="white"
              opacity={0.3}
            />
          </Group>
        </Group>
        <Group name="spotlight-bottom">
          <Ellipse
            radiusX={width}
            radiusY={height}
            fill={stroke}
            opacity={0.5}
          />
        </Group>
      </Group>
    </>
  );
};

export default SpotLightAnnotation;
