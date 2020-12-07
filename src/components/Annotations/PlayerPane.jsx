import React, { useState, useEffect } from "react";
import { TopBar } from "./TopBar";
import VideoControl from "./../vid/VideoControl";
import { SideBar } from "./SideBar";
import DrawPane from "./DrawPane";
import VideoPlayer from "../vid/VideoPlayer";
import videoSample from "../../videos/RPReplay_Final1576501712_Trim.mp4";

export const PlayerPane = () => {
  const [currentColor, setCurrentColor] = useState("#34E4B7");
  const [currentLine, setCurrentLine] = useState("line1");
  const [currentShape, setCurrentShape] = useState(null);
  const [colorStyleState, setColorStyleState] = useState({
    height: "24px",
    width: "24px",
    borderRadius: "20px",
    display: "inline-block",
    margin: "4px 0px 0px 1px",
    backgroundColor: "#34E4B7",
  });
  const [lineStyleState, setLineStyleState] = useState({
    width: "34px",
    display: "inline-block",
    margin: "0px 0px 0px 0px",
    backgroundColor: "#34E4B7",
    height: "2px",
    borderTop: " ",
  });
  const [colors, setColors] = useState([]);

  return (
    <div className="row">
      <div className="col-12 col-sm-12 pl-0 pr-0">
        <TopBar />
      </div>

      {/** Force next columns to break to new line at md breakpoint and up */}
      <div className="w-100 d-none d-md-block" />

      <div className="col-side-right">
        <SideBar
          currentColor={currentColor}
          currentLine={currentLine}
          currentShape={currentShape}
          colorStyleState={colorStyleState}
          lineStyleState={lineStyleState}
          colors={colors}
          setCurrentColor={setCurrentColor}
          setCurrentLine={setCurrentLine}
          setCurrentShape={setCurrentShape}
          setColorStyleState={setColorStyleState}
          setLineStyleState={setLineStyleState}
          setColors={setColors}
        />
      </div>

      <div className="col-side-left">
        <div className="videoDiv">
          <VideoPlayer playsInline src={videoSample} />
        </div>

        <DrawPane
          currentColor={currentColor}
          currentLine={currentLine}
          currentShape={currentShape}
          colorStyleState={colorStyleState}
          lineStyleState={lineStyleState}
          colors={colors}
        />
      </div>
      <div className="col-12 col-sm-12 pl-0 pr-0">
        <VideoControl />
      </div>
    </div>
  );
};
