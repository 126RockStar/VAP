import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { setVideoState } from "../../actions/video.action";

const sources = {
  dashReel: "../../videos/RPReplay_Final1576501712_Trim.mp4",
};

const VideoPlayer = () => {
  const dispatch = useDispatch();
  const videoState = useSelector((state) => state.video);
  let videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    if (videoRef && !playing) {
      const pos = parseFloat(
        (videoState.dragPosition / videoState.perSecondWidth).toFixed(2)
      );
      if (pos > 0) {
        videoRef.seekTo(pos);
      }
    }
  }, [videoState.dragPosition, videoRef]);

  useEffect(() => {
    setPlaying(videoState.play);
  }, [videoState.play]);

  const handleProgress = (data) => {
    dispatch(setVideoState(totalSeconds, data));
  };

  const handleError = (err) => {
    if (err) {
      setMuted(true);
    }
  };

  const handleSeek = (second) => {};

  const handleDuration = (total) => {
    setTotalSeconds(total);
    dispatch(setVideoState(totalSeconds, null));
  }

  return (
    <ReactPlayer
      ref={(player) => (videoRef = player)}
      url={sources.dashReel}
      width={1382}
      height="auto"
      playing={playing}
      progressInterval={50}
      onSeek={handleSeek}
      onProgress={handleProgress}
      onError={handleError}
      onDuration={handleDuration}
      muted={muted}
    />
  );
};

export default VideoPlayer;
