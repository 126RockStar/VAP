import React, { useState, useEffect } from "react";
import { Text } from "react-konva";
import { SHAPES } from "../../constants/draw";

const TextAnnotation = ({ shapeProps }) => {
  const [showEditor, setShowEditor] = useState(false);

  const onDblClick = (e) => {
    setShowEditor(true);
  };

  const { x, y, width, height } = shapeProps;
  const style = {
    position: "absolute",
    x,
    y,
    width,
    height,
  };
  return (
    <>
      {showEditor && <textarea style={style} />}
      <Text {...shapeProps} onDblClick={onDblClick} visible={!showEditor} />
    </>
  );
};

export default TextAnnotation;
