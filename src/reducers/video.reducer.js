import { videoControl } from "../actions/actionTypes";

const initState = {
  play: false,
  dragStart: false,
  dragPosition: 0,
  perSecondWidth: 36,
  updatedAt: 0,
  total: 0,
  currentState: null,
};

// reducer to change the state of alert
export function video(state = initState, action) {
  switch (action.type) {
    case videoControl.VIDEO_PLAY:
      return {
        ...state,
        play: action.play,
        dragStart: false,
      };
    case videoControl.THUMB_DRAG_START: {
      const { position, perSecondWidth, updatedAt } = action.payload;

      if (Math.abs(state.updatedAt - updatedAt) < 40) {
        return state;
      }

      return {
        ...state,
        dragStart: true,
        dragPosition: position,
        perSecondWidth,
        updatedAt,
      };
    }
    case videoControl.THUMB_DRAG_STOP:
      return {
        ...state,
        dragStart: false,
      };
    case videoControl.VIDEO_LOADED:
      return {
        ...state,
        total: action.total,
        currentState: action.payload,
      };
    default:
      return state;
  }
}
