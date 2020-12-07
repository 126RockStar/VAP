/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from "react";
import SVG from "react-inlinesvg";
import { useDispatch } from "react-redux";

import { getColors } from "./ColorPalette";
import { getLinesByColor } from "./LineType";
import { SHAPES } from "../../constants/draw";

import "./Annotations.scss";

import FreeDraw from "./Icons/free-draw-icon.svg";
import PathDraw from "./Icons/path-icon.svg";
import ArrowDraw from "./Icons/arrow-icon.svg";
import CurveArrowDraw from "./Icons/curved-arrow-icon.svg";
import SpotlightDraw from "./Icons/spotlight-icon.svg";
import { colorChange, shapeChange } from "../../actions/event.actions";

export const SideBar = ({
  currentColor,
  currentLine,
  currentShape,
  colorStyleState,
  colors,
  lineStyleState,
  setCurrentColor,
  setCurrentLine,
  setCurrentShape,
  setColorStyleState,
  setLineStyleState,
  setColors,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setColors(getColors());
    // this.setState({ lines: getLines() });
  }, []);

  const handleColorChange = (color) => {
    let newLineStyleState = {};
    dispatch(colorChange(color));

    if (currentLine === "line5") {
      newLineStyleState = {
        ...lineStyleState,
        height: "",
        backgroundColor: "",
        borderTop: `2px dotted ${color}`,
      };
    } else if (currentLine === "line6") {
      newLineStyleState = {
        ...lineStyleState,
        height: "",
        backgroundColor: "",
        borderTop: `2px dashed ${color}`,
      };
    } else {
      newLineStyleState = {
        ...lineStyleState,
        backgroundColor: color,
      };
    }

    setCurrentColor(color);
    setColorStyleState({
      ...colorStyleState,
      backgroundColor: color,
    });
    setLineStyleState(newLineStyleState);
  };

  const handleLineChange = (line) => {
    let bgColor = currentColor;
    if (line.name === "line5" || line.name === "line6") {
      bgColor = "#2a2a2a";
    }

    dispatch(shapeChange(line.name));
    setCurrentLine(line.name);
    setLineStyleState({
      ...lineStyleState,
      backgroundColor: bgColor,
      height: line.style.height,
      borderTop: line.style.borderTop,
    });
  };

  const handleShapeChange = (shape) => {
    setCurrentShape(shape);
  };

  const getLineChildDivClass = (line) => {
    let className;
    if (line === currentLine) {
      className = "lineDivChild active";
    } else {
      className = "lineDivChild";
    }
    return className;
  };

  return (
    <div className="sidebar">
      <div className="btn-group dropright">
        <button
          type="button"
          className="sidebar-base-btn"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          COLOR
          <div style={colorStyleState} />
        </button>
        <div className="dropdown-menu">
          {colors.map((color) => (
            <div
              key={color.hex}
              className="colorDivChild"
              onClick={() => handleColorChange(color.hex)}
            >
              <div key={color.hex} style={color.style} />
            </div>
          ))}
        </div>
      </div>

      <div className="btn-group dropright">
        <button
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          className="sidebar-base-btn"
        >
          LINE TYPE
          <div style={lineStyleState} />
        </button>
        <div className="dropdown-menu">
          {getLinesByColor(currentColor).map((line) => (
            <div
              key={line.name}
              className={getLineChildDivClass(line.name)}
              onClick={() => handleLineChange(line)}
            >
              <div key={line.name} style={line.style} />
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={() => handleShapeChange(SHAPES.CIRCLE)}
        className={`sidebar-base-btn circle-btn ${
          currentShape === SHAPES.CIRCLE ? "active" : ""
        }`}
      />
      <div
        onClick={() => handleShapeChange(SHAPES.ARROW)}
        className={`sidebar-base-btn ${
          currentShape === SHAPES.ARROW ? "active" : ""
        }`}
      >
        <SVG src={ArrowDraw} />
      </div>
      <div
        onClick={() => handleShapeChange(SHAPES.DOODLE)}
        className={`sidebar-base-btn ${
          currentShape === SHAPES.DOODLE ? "active" : ""
        }`}
      >
        <SVG src={FreeDraw} />
      </div>
      <div
        onClick={() => handleShapeChange(SHAPES.CIRCLE_FILLED)}
        className={`sidebar-base-btn dot-btn ${
          currentShape === SHAPES.CIRCLE_FILLED ? "active" : ""
        }`}
      />
      <div
        onClick={() => handleShapeChange(SHAPES.SPOTLIGHT)}
        className={`sidebar-base-btn ${
          currentShape === SHAPES.SPOTLIGHT ? "active" : ""
        }`}
      >
        <SVG src={SpotlightDraw} />
      </div>
      <div
        onClick={() => handleShapeChange(SHAPES.CURVE_ARROW)}
        className={`sidebar-base-btn ${
          currentShape === SHAPES.CURVE_ARROW ? "active" : ""
        }`}
      >
        <SVG src={CurveArrowDraw} />
      </div>
      <div
        onClick={() => handleShapeChange(SHAPES.PATH)}
        className={`sidebar-base-btn ${
          currentShape === SHAPES.PATH ? "active" : ""
        }`}
      >
        <SVG src={PathDraw} />
      </div>
      <div
        onClick={() => handleShapeChange(SHAPES.TEXT)}
        className={`sidebar-base-btn text-btn ${
          currentShape === SHAPES.TEXT ? "active" : ""
        }`}
      >
        Aa
      </div>
      <div
        onClick={() => handleShapeChange(SHAPES.RECT)}
        className={`sidebar-base-btn square-btn ${
          currentShape === SHAPES.RECT ? "active" : ""
        }`}
      />
    </div>
  );
};
