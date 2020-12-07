import { videoControl } from "./actionTypes";

export function videoPlay(value) {
  return {
    type: videoControl.VIDEO_PLAY,
    play: value,
  };
}

export function thumbDragStart(position, perSecondWidth, updatedAt) {
  return {
    type: videoControl.THUMB_DRAG_START,
    payload: { position, perSecondWidth, updatedAt },
  };
}

export function thumbDragStop() {
  return {
    type: videoControl.THUMB_DRAG_STOP,
  };
}

export function setVideoState(total, payload) {
  return {
    type: videoControl.VIDEO_LOADED,
    total,
    payload,
  };
}
