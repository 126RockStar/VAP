/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import uuid from "uuid/v1";
import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
import {
  ReactReduxContext,
  Provider,
  useSelector,
  useDispatch,
} from "react-redux";
import Annotation from "./Annotation";
import { EDITTEXT, SHAPES } from "../../constants/draw";
import { createShapeProps, updateLineShape } from "../../utils/shape";
import "./styles.css";

import {
  changeTextEnd,
  changingText,
  changeTextStart,
  maskCircleStart,
  maskCircleEnd,
  highLightStart,
  highLightEnd,
  saveSeletedId,
} from "../../actions/event.actions";

const initialAnnotations = [];

const DrawPane = ({
  currentColor,
  currentLine,
  currentShape,
  lineStyleState,
}) => {
  const dispatch = useDispatch();
  const {
    editText,
    maskCircle,
    highLight,
    removeAll,
    saveSelectedID,
    colorChange,
    shapeChange,
  } = useSelector((state) => ({
    editText: state.event.editText,
    maskCircle: state.event.maskCircle,
    highLight: state.event.highLight,
    removeAll: state.event.removeAll,
    saveSelectedID: state.event.saveSelectedID,
    colorChange: state.event.colorChange,
    shapeChange: state.event.shapeChange,
  }));
  const inputEl = useRef(null);

  const [annotations, setAnnotations] = useState(initialAnnotations);
  const [newAnnotation, setNewAnnotation] = useState([]);

  const [selectedId, selectAnnotation] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [canvasMeasures, setCanvasMeasures] = useState({
    width: 1352, // window.innerWidth,
    height: 700, // window.innerHeight
  });
  const [textValue, setTextValue] = useState("");

  const { height: strokeWidth } = lineStyleState;

  useEffect(() => {
    if (editText.enable) {
      inputEl.current.focus();
    }
  }, [editText]);

  useEffect(() => {
    setNewAnnotation([]);
    setAnnotations([]);
  }, [removeAll]);

  useEffect(() => {
    if (selectedId !== null) {
      const _annotations = annotations.map((element) => {
        if (saveSelectedID === element.id) {
          return {
            ...element,
            stroke: currentColor,
          };
        }
        return element;
      });
      setAnnotations(_annotations);
    }
  }, [colorChange]);

  useEffect(() => {
    if (selectedId !== null) {
      const _annotations = annotations.map((element) => {
        if (saveSelectedID === element.id) {
          return updateLineShape(element, currentLine);
        }
        return element;
      });
      setAnnotations(_annotations);
    }
  }, [shapeChange]);

  const handleMouseDown = (event) => {
    // console.log("Handle Mouse Down:",currentLine, event);
    if (
      selectedId === null &&
      newAnnotation.length === 0 &&
      editText.enable === false
    ) {
      const { x, y } = event.target.getStage().getPointerPosition();
      const id = uuid();
      setNewAnnotation([
        createShapeProps(
          currentShape,
          x,
          y,
          0,
          0,
          currentColor,
          currentLine,
          id,
          strokeWidth
        ),
      ]);
      if (currentShape === SHAPES.TEXT) {
        dispatch(changeTextStart(id, "", x, y));
      }
      if (currentShape === SHAPES.CIRCLE_FILLED) {
        dispatch(maskCircleStart());
      }
      if (currentShape === SHAPES.SPOTLIGHT) {
        dispatch(highLightStart());
      }
    }

    if (selectedId === null && editText.enable) {
      dispatch(changeTextEnd(textValue));
    }
  };

  const handleMouseMove = (event) => {
    if (currentShape === SHAPES.TEXT) {
      return;
    }

    if (selectedId === null && newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const id = uuid();
      setNewAnnotation([
        createShapeProps(
          currentShape,
          sx,
          sy,
          x - sx,
          y - sy,
          currentColor,
          currentLine,
          id,
          strokeWidth
        ),
      ]);
    }
  };

  const handleMouseUp = () => {
    // console.log("Handle Mouse Up:", event);
    if (selectedId === null && newAnnotation.length === 1) {
      annotations.push(...newAnnotation);
      setAnnotations(annotations);
      setNewAnnotation([]);
      dispatch(changeTextEnd(textValue)); // Text change
      if (currentShape === SHAPES.DOODLE) {
        const textWidth =
          2.5 *
          Number(
            Math.sqrt(
              newAnnotation[0].width ** 2 + newAnnotation[0].height ** 2
            )
          );
        dispatch(
          changeTextStart(
            newAnnotation[0].id,
            "",
            newAnnotation[0].x + newAnnotation[0].width,
            newAnnotation[0].y + newAnnotation[0].height - 20,
            EDITTEXT.height,
            textWidth
          )
        );
      }
    }
    if (currentShape === SHAPES.TEXT) {
      if (selectedId !== null && newAnnotation.length === 1) {
        annotations.push(...newAnnotation);
        setAnnotations(annotations);
        setNewAnnotation([]);
      }
    }
  };

  const handleMouseEnter = (event) => {
    // console.log("Handle Mouse Enter:", event);
    const { target } = event;
    target.getStage().container().style.cursor = "crosshair";
  };

  const handleKeyDown = (event) => {
    // console.log("Handle Key Down:", event);
    if (event.keyCode === 27 || event.keyCode === 46) {
      if (selectedId !== null) {
        console.log("selectedID", selectedId, annotations);
        const selectAnnotations = annotations.find(
          (annotation) => annotation.id === selectedId
        );
        if (selectAnnotations.shape === SHAPES.CIRCLE_FILLED) {
          dispatch(maskCircleEnd());
        }
        if (selectAnnotations.shape === SHAPES.SPOTLIGHT) {
          dispatch(highLightEnd());
        }
        const newAnnotations = annotations.filter(
          (annotation) => annotation.id !== selectedId
        );
        // console.log('selectedID', selectedId, newAnnotations);
        setAnnotations(newAnnotations);
      }
    }
  };

  const handleTextareaChange = (e) => {
    const { value } = e.target;
    dispatch(changingText(editText.id, value, e.target.scrollHeight));
    setTextValue(value);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { value } = e.target;
      dispatch(changeTextEnd(value));
    }
    inputEl.current.style.height = "auto";
    inputEl.current.style.height = `${inputEl.current.scrollHeight + 12}px`;
  };

  let annotationsToDraw = [...annotations, ...newAnnotation];
  if (editText.id !== "") {
    annotationsToDraw = annotationsToDraw.map((elem) => {
      const element = { ...elem };

      if (editText.id === element.id) {
        element.text = editText.changeText;
        if (currentShape === SHAPES.TEXT) {
          element.x = editText.positionX;
          element.y = editText.positionY;
        }
        if (currentShape === SHAPES.DOODLE) {
          element.textPositionY =
            element.height - editText.scrollHeight + 35 - 15;
        }
      }
      return element;
    });
  }

  return (
    <div tabIndex={1} onKeyDown={handleKeyDown}>
      {editText.enable && (
        <textarea
          value={editText.changeText}
          ref={inputEl}
          style={{
            position: "absolute",
            zIndex: 1,
            top:
              currentShape === SHAPES.DOODLE
                ? editText.positionY - editText.scrollHeight + 35 + 40
                : editText.positionY + 40,
            left: editText.positionX + 55,
            border: "none",
            outline: "none",
            resize: "none",
            overflow: "hidden",
            background: "transparent",
            // background: "yellow",
            width: `${editText.width}px`,
            color: currentColor,
            fontSize: "13px",
            height: `${editText.height + 20}px`,
          }}
          rows={1}
          onKeyDown={handleTextareaKeyDown}
          onChange={handleTextareaChange}
        />
      )}
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={canvasMeasures.width}
            height={canvasMeasures.height}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Provider store={store}>
              <Layer>
                {maskCircle.count + highLight.count !== 0 ? (
                  <Rect
                    x={0}
                    y={0}
                    width={canvasMeasures.width}
                    height={canvasMeasures.height}
                    opacity={0.5}
                    fill="black"
                    onMouseDown={() => {
                      // deselect when clicked on empty area
                      selectAnnotation(null);
                    }}
                  />
                ) : (
                  <Rect
                    x={0}
                    y={0}
                    width={canvasMeasures.width}
                    height={canvasMeasures.height}
                    fill="transparent"
                    onMouseDown={() => {
                      // deselect when clicked on empty area
                      selectAnnotation(null);
                    }}
                  />
                )}
                {annotationsToDraw.map((annotation, i) => {
                  if (!annotation) {
                    return null;
                  }
                  return (
                    <Annotation
                      key={annotation.id || i}
                      shapeProps={annotation}
                      isSelected={annotation.id === selectedId}
                      onSelect={() => {
                        selectAnnotation(annotation.id);
                        dispatch(saveSeletedId(annotation.id));
                      }}
                    />
                  );
                })}
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

export default DrawPane;
