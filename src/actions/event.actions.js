import {
  eventActions,
  eventMaskCircle,
  eventHighLight,
  eventControl,
  eventColorChange,
  eventShapeChange,
  eventSaveSelectedId,
} from "./actionTypes";

export function changeTextStart(
  id,
  message,
  positionX,
  positionY,
  height,
  width,
  scrollHeight
) {
  return {
    type: eventActions.EDIT_TEXT_START,
    id,
    positionX,
    positionY,
    height,
    width,
    text: message,
    scrollHeight,
  };
}

export function changingText(id, message, scrollHeight) {
  return {
    type: eventActions.EDIT_TEXT_DOING,
    id,
    text: message,
    scrollHeight,
  };
}

export function changeTextEnd(message) {
  return {
    type: eventActions.EDIT_TEXT_END,
    text: message,
  };
}

export function maskCircleStart() {
  return {
    type: eventMaskCircle.MASK_CIRCLE_START,
  };
}

export function maskCircleEnd() {
  return {
    type: eventMaskCircle.MASK_CIRCLE_END,
  };
}

export function highLightStart() {
  return {
    type: eventHighLight.MASK_HIGHLIGHT_START,
  };
}

export function highLightEnd() {
  return {
    type: eventHighLight.MASK_HIGHLIGHT_END,
  };
}

export function removeAllAnnotations() {
  return {
    type: eventControl.REMOVE_ALL,
  };
}

export function colorChange(color) {
  return {
    type: eventColorChange.COLOR_CHANGE,
    payload: color,
  };
}

export function shapeChange(shape) {
  return {
    type: eventShapeChange.SHAPE_CHANGE,
    payload: shape,
  };
}

export function saveSeletedId(id) {
  return {
    type: eventSaveSelectedId.SELECT_ID,
    payload: id,
  };
}
