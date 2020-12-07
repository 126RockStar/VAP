/* eslint-disable class-methods-use-this */
import React, { useEffect, Component, useState } from "react";
import { Transformer } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import TextAnnotation from "./ShapeComponent/Text";
import RectAnnotation from "./ShapeComponent/Rect";
import CircleAnnotation from "./ShapeComponent/Circle";
import CircleFilledAnnotation from "./ShapeComponent/CircleFilled";
import ArrowAnnotation from "./ShapeComponent/Arrow";
import CurveAnnotation from "./ShapeComponent/Curve";
import SpotLightAnnotation from "./ShapeComponent/SpotLight";
import DoodleAnnotation from "./ShapeComponent/Doodle";
import { SHAPES, EDITTEXT } from "../../constants/draw";
import { changeTextStart } from "../../actions/event.actions";

class TransformerComponent extends Component {
  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  onTransformStart() {
    console.log("onTransformStart");
  }

  onTransform() {
    console.log("onTransform");
  }

  onTransformEnd() {
    console.log("end transform");
  }

  checkNode() {
    // here we need to manually attach or detach Transformer node
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;

    let selectedNode = stage.findOne(`.${selectedShapeName}`);
    // do nothing if selected node is already attached
    if (selectedNode === this.transformer.node()) {
      return;
    }
    if (selectedNode) {
      const type = selectedNode.getType();
      if (type !== "Group") {
        selectedNode = selectedNode.findAncestor("Group");
      }
      // attach to another node
      this.transformer.attachTo(selectedNode);
    } else {
      // remove transformer
      this.transformer.detach();
    }

    this.transformer.getLayer().batchDraw();
  }

  render() {
    return (
      <Transformer
        ref={(node) => {
          this.transformer = node;
        }}
        transformstart={this.onTransformStart}
        transform={this.onTransform}
        transformend={this.onTransformEnd}
      />
    );
  }
}

const Annotation = ({ shapeProps, isSelected, onSelect }) => {
  const { editText } = useSelector((state) => ({
    editText: state.event.editText,
  }));
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (isSelected) {
      console.log("isSelected", shapeProps);
    }
  }, [isSelected]);

  useEffect(() => {
    if (shapeProps.id === editText.id) {
      setHide(editText.enable);
    }
  }, [editText.enable]);

  const handleEditText = (event) => {
    const stage = event.target.getStage();
    const selectedNode = stage.findOne(`.${shapeProps.id}`);
    const clientHeight = selectedNode.getClientRect().height;
    const clientWidth = selectedNode.getClientRect().width;
    dispatch(
      changeTextStart(
        shapeProps.id,
        shapeProps.text,
        selectedNode.attrs.x,
        selectedNode.attrs.y,
        clientHeight,
        clientWidth
      )
    );
  };

  const handleDoodleEditText = (event, width, height, textWidth) => {
    const stage = event.target.getStage();
    const selectedNode = stage.findOne(`.${shapeProps.id}`);
    console.log("doodle", shapeProps);
    const scrollHeight = height + 35 - 15 - shapeProps.textPositionY;
    dispatch(
      changeTextStart(
        shapeProps.id,
        shapeProps.text,
        selectedNode.attrs.x + width,
        selectedNode.attrs.y + height - 20,
        EDITTEXT.height,
        textWidth,
        scrollHeight
      )
    );
  };

  const onMouseEnter = (event) => {
    const { target } = event;
    target.getStage().container().style.cursor = "move";
  };

  const onMouseLeave = (event) => {
    const { target } = event;
    target.getStage().container().style.cursor = "crosshair";
  };

  const { shape } = shapeProps;

  let commonProps = {
    onMouseDown: onSelect,
    draggable: true,
    name: shapeProps.id,
    onMouseEnter,
    onMouseLeave,
    ...shapeProps,
  };

  if (shape === SHAPES.TEXT) {
    commonProps = {
      ...commonProps,
      w: editText.width,
      onEditText: handleEditText,
      hide,
    };
  }

  if (shape === SHAPES.DOODLE) {
    commonProps = {
      ...commonProps,
      onDoodleEditText: handleDoodleEditText,
      hide,
    };
  }

  return (
    <>
      {shape === SHAPES.CIRCLE && <CircleAnnotation shapeProps={commonProps} />}
      {shape === SHAPES.CIRCLE_FILLED && (
        <CircleFilledAnnotation shapeProps={commonProps} />
      )}
      {shape === SHAPES.ARROW && <ArrowAnnotation shapeProps={commonProps} />}
      {shape === SHAPES.RECT && <RectAnnotation shapeProps={commonProps} />}
      {shape === SHAPES.TEXT && <TextAnnotation shapeProps={commonProps} />}
      {shape === SHAPES.CURVE_ARROW && (
        <CurveAnnotation shapeProps={commonProps} />
      )}
      {shape === SHAPES.SPOTLIGHT && (
        <SpotLightAnnotation shapeProps={commonProps} />
      )}
      {shape === SHAPES.DOODLE && <DoodleAnnotation shapeProps={commonProps} />}
      {isSelected && (
        <TransformerComponent selectedShapeName={commonProps.name} />
      )}
    </>
  );
};

export default Annotation;
