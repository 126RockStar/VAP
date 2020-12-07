/* eslint-disable no-shadow */
import { SHAPES } from "../constants/draw";

const determineDotDash = (line) => {
  let dotDash = [];
  if (line === "line5") {
    dotDash = [2, 2];
  } else if (line === "line6") {
    dotDash = [10, 10];
  }
  return dotDash;
};

const determineStrokeWidth = (line) => {
  let strokeWidth = 2;
  if (line === "line1") {
    strokeWidth = 2;
  }
  if (line === "line2") {
    strokeWidth = 4;
  }
  if (line === "line3") {
    strokeWidth = 6;
  }
  if (line === "line4") {
    strokeWidth = 8;
  }
  return strokeWidth;
};

export const createShapeProps = (
  shape,
  x,
  y,
  w,
  h,
  color,
  line,
  id,
  strokeWidthOrig
) => {
  const strokeWidth = parseInt(strokeWidthOrig || 2, 10);
  const radius = Math.sqrt(w ** 2 + h ** 2);

  function determineStrokeWidth(sw) {
    let sb2 = sw.replace("px", "");
  }

  function determineStrokeWidth(tmpOthers) {
    let sb2 = sw.replace("px", "");
  }

  switch (shape) {
    case SHAPES.CIRCLE: {
      return {
        id,
        x,
        y,
        radius,
        shape,
        stroke: color,
        strokeWidth,
        fill: "transparent",
        dash: determineDotDash(line),
      };
    }

    case SHAPES.CIRCLE_FILLED: {
      return {
        id,
        x,
        y,
        radius,
        shape,
        stroke: color,
        strokeWidth,
        fill: color,
      };
    }

    case SHAPES.RECT:
      return {
        id,
        x,
        y,
        width: w,
        height: h,
        shape,
        stroke: color,
        strokeWidth,
        dash: determineDotDash(line),
      };

    case SHAPES.ARROW: {
      return {
        id,
        shape,
        x,
        y,
        w,
        h,
        points: [0, 0, w, h],
        fill: color,
        stroke: color,
        strokeWidth,
        dash: determineDotDash(line),
      };
    }

    case SHAPES.TEXT: {
      return {
        id,
        shape,
        x,
        y,
        stroke: color,
        strokeWidth,
      };
    }

    case SHAPES.CURVE_ARROW: {
      return {
        id,
        shape,
        x,
        y,
        w,
        h,
        fill: color,
        stroke: color,
        strokeWidth,
        dash: determineDotDash(line),
      };
    }

    case SHAPES.SPOTLIGHT: {
      return {
        id,
        x,
        y,
        width: w,
        height: h,
        shape,
        stroke: color,
        strokeWidth,
        fill: color,
      };
    }

    case SHAPES.DOODLE: {
      return {
        id,
        x,
        y,
        width: w,
        height: h,
        shape,
        stroke: color,
        strokeWidth,
        fill: color,
        dash: determineDotDash(line),
      };
    }

    default:
      return null;
  }
};

export const updateLineShape = (elem, line) => {
  const element = { ...elem };
  // let updateElement = element;
  element.strokeWidth = determineStrokeWidth(line);
  if (
    element.shape === SHAPES.CIRCLE ||
    element.shape === SHAPES.ARROW ||
    element.shape === SHAPES.DOODLE ||
    element.shape === SHAPES.CURVE_ARROW ||
    element.shape === SHAPES.RECT
  ) {
    element.dash = determineDotDash(line);
  }
  return element;
};
