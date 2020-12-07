/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./VideoControl.scss";
import Draggable from "react-draggable";
import { thumbDragStart, videoPlay } from "../../actions/video.action";

import pointImage from "../../images/pointer.png";
import playImage from "../../images/play.png";
import pauseImage from "../../images/pause.png";
import preveImage from "../../images/preve.png";
import nextImage from "../../images/next.png";
import bookmarkImage from "../../images/bookmark.png";
import volumeDownImage from "../../images/volumnDown.png";
import volumeUpImage from "../../images/volumnUp.png";

const videoName = "RPReplay_Final1576501712_Trim";
const THUMB_IMGS_DIRECTORY = `../../images/video-image/${videoName}`;
const IMAGES = require.context(
  "../../images/video-image/RPReplay_Final1576501712_Trim",
  true
);

const WIDTH = 1440; // px
const PER_SECOND_WIDTH_ZOOM_IN = 46; // px: 1440/30=48 (delta -2)
const PER_SECOND_WIDTH_ZOOM_OUT = 140; // px: 1140/10=144 (delta-4)

function importAll(r) {
  const images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context(
    "../../images/video-image/RPReplay_Final1576501712_Trim",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const VideoControl = () => {
  const dispatch = useDispatch();

  const [imgCount, setImgCount] = useState(12);
  const [play, setPlay] = useState(false);
  const [volumn, setVolumn] = useState(0);

  let positionX = 0;
  const [duration, setDuration] = useState([]);
  const [timeLineWidth, setTimeLineWidth] = useState(WIDTH);
  const [perSecondWidth, setPerSecondWidth] = useState(
    PER_SECOND_WIDTH_ZOOM_IN
  );
  const [dragPosition, setDragPosition] = useState({ x: WIDTH / 2, y: 0 });

  const { currentState, total } = useSelector((state) => state.video);

  useEffect(() => {
    if (currentState && currentState.loadedSeconds) {
      setImgCount(Math.ceil(total / 5));

      const duration = [];
      const totalSeconds = Math.ceil(total);

      if (totalSeconds > 30) {
        for (let i = 0; i < totalSeconds; i++) {
          duration.push({
            second: i,
          });
        }
      } else {
        for (let i = 0; i < 30; i++) {
          duration.push({
            second: i,
          });
        }
      }
      setDuration(duration);

      const _timeLineWidth = perSecondWidth * totalSeconds;
      setTimeLineWidth(_timeLineWidth);
    }

    // console.log("currentState", currentState);
  }, [currentState, currentState?.loadedSeconds]);

  useEffect(() => {
    setDragPosition({
      x: currentState
        ? WIDTH / 2 - currentState.playedSeconds * perSecondWidth
        : WIDTH / 2,
      y: 0,
    });
  }, [perSecondWidth]);
  const handlePlay = () => {
    setPlay((val) => !val);
    dispatch(videoPlay(!play));
    if (play) {
      setDragPosition({
        x: currentState
          ? WIDTH / 2 - currentState.playedSeconds * perSecondWidth
          : WIDTH / 2,
        y: 0,
      });
    }
  };

  const handleDrag = (e, ui) => {
    const { x } = ui;
    if (x > 0) {
      positionX = WIDTH / 2 - ui.x;
    } else {
      positionX = WIDTH / 2 + Math.abs(x);
    }
    if (positionX > 0) {
      return dispatch(
        thumbDragStart(positionX, perSecondWidth, new Date().getTime())
      );
    }

    return false;
  };

  const onStart = () => {
    // this.setState({activeDrags: ++this.state.activeDrags});
    positionX = 0;
  };

  const onStop = (e, ui) => {
    // this.setState({activeDrags: --this.state.activeDrags});
    const { x, y } = ui;
    if (x > 0) {
      positionX = WIDTH / 2 - ui.x;
    } else {
      positionX = WIDTH / 2 + Math.abs(x);
    }
    console.log("positionX", positionX);
    setDragPosition({
      x: WIDTH / 2 - positionX,
      y: 0,
    });
  };

  const onVolumnChange = (event) => {
    setVolumn(event.target.value);
    const percent = parseInt(event.target.value, 10);
    const widthDelta = PER_SECOND_WIDTH_ZOOM_OUT - PER_SECOND_WIDTH_ZOOM_IN;
    const _perSecondWidth = parseInt(
      (widthDelta * percent) / 100 + PER_SECOND_WIDTH_ZOOM_IN,
      10
    );
    setPerSecondWidth(_perSecondWidth);
  };

  const generateLabel = (s) => {
    const minute = parseInt(s / 60, 10);
    const second = s - minute * 60;
    const _minute = minute < 10 ? `0${minute}` : minute;
    const _second = second < 10 ? `0${second}` : second;
    const value = `${_minute}:${_second}:00`;
    return value;
  };

  // console.log('per secondWidth', perSecondWidth);

  return (
    <div className="video-control">
      <div className="video-control__buttons">
        <div className="add_bookmark">
          <div>
            <img src={bookmarkImage} draggable={false} alt="Bookmark" />
            ADD BOOKMARK
          </div>
        </div>
        <div className="main_control">
          <div className="main_control__record">
            <div type="button">
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "100%",
                  background: "red",
                  border: "2px solid white",
                }}
              />
              START RECORD
            </div>
          </div>
          <div className="main_control__play">
            <div style={{ marginRight: "7px" }}>
              <img src={preveImage} draggable={false} alt="Prev" />
            </div>
            <div onClick={handlePlay} style={{ cursor: "pointer" }}>
              {!play ? (
                <img src={playImage} draggable={false} alt="Play" />
              ) : (
                <img src={pauseImage} draggable={false} alt="Pause" />
              )}
            </div>
            <div style={{ marginLeft: "8px" }}>
              <img src={nextImage} draggable={false} alt="Next" />
            </div>
          </div>
          <div className="main_control__speed">
            <span style={{ color: "#7B849E" }}>PLAYBACK SPEED:</span>
            <span style={{ marginLeft: "10px" }}>NORMAL</span>
          </div>
        </div>
        <div className="volumn_control">
          <img
            src={volumeDownImage}
            draggable={false}
            style={{ marginRight: "10px" }}
            alt="Volume Down"
          />
          <div className="slidecontainer">
            <input
              type="range"
              min="1"
              max="100"
              value={volumn}
              onChange={onVolumnChange}
            />
          </div>
          <img
            src={volumeUpImage}
            draggable={false}
            style={{ marginLeft: "10px" }}
            alt="Volume Up"
          />
        </div>
      </div>

      <div className="video-control__images">
        <div className="pointer_icon">
          <img src={pointImage} alt="" />
          <div className="pointer" />
        </div>
        <Draggable
          axis="x"
          handle=".preivew"
          defaultPosition={{ x: WIDTH / 2, y: 0 }}
          position={
            play
              ? {
                  x: currentState
                    ? WIDTH / 2 - currentState.playedSeconds * perSecondWidth
                    : WIDTH / 2,
                  y: 0,
                }
              : {
                  x: dragPosition.x,
                  y: dragPosition.y,
                }
          }
          grid={[1, 1]}
          scale={1}
          onStart={onStart}
          onDrag={handleDrag}
          onStop={onStop}
        >
          <div className="preivew">
            <div className="labels" style={{ width: `${timeLineWidth}px` }}>
              {duration.map((item, index) => {
                return (
                  <div key={item.id || index}>
                    {item.second % 5 === 0 ? (
                      <div
                        className="second-label"
                        style={{ width: `${perSecondWidth * 5}px` }}
                      >
                        {generateLabel(item.second)}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="timeline" style={{ width: `${timeLineWidth}px` }}>
              {duration.map((item, index) => {
                if ((currentState.playedSeconds-16)<index && (currentState.playedSeconds+16)>index) {
                  return (
                    <div
                      key={index}
                      className="second-item"
                      style={{display:'none'}}
                      style={{ width: `${perSecondWidth}px`}}
                    >
                      <div className="line">
                        <div className="line-one" />
                        <div className="line-three" />
                        <div className="line-three" />
                        <div className="line-two" />
                        <div className="line-three" />
                        <div className="line-three" />
                        <div className="line-one" />
                        <div className="line-three" />
                        <div className="line-three" />
                        <div className="line-two" />
                        <div className="line-three" />
                        <div className="line-three" />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="second-item"
                      style={{display:'none'}}
                      style={{ width: `${perSecondWidth}px`}}
                    >
                    </div>
                  )
                }                
              })}
            </div>
            <div className="thumbnails-images">
              {Object.values(images).map((src, index) => {
                return (
                  <div key={index}>
                    {index < imgCount - 1 ? (
                      <img
                        src={src.default}
                        key={index}
                        width={perSecondWidth * 5} // 1 thumbnail every 5s
                        height={70}
                        draggable={false}
                        alt=""
                        style={{ borderRadius: "10px", paddingRight: "5px" }}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>            
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default VideoControl;
