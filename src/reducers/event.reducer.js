/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import {
  eventActions,
  eventMaskCircle,
  eventHighLight,
  eventControl,
  eventColorChange,
  eventShapeChange,
  eventSaveSelectedId,
} from "../actions/actionTypes";

import { EDITTEXT } from "../constants/draw";

const initState = {
  editText: {
    id: "",
    enable: false,
    changeText: "",
    positionX: "",
    positionY: "",
    width: EDITTEXT.width,
    height: EDITTEXT.height,
    scrollHeight: 35,
  },
  maskCircle: {
    count: 0,
  },
  highLight: {
    count: 0,
  },
  removeAll: false,
  saveSelectedID: "",
  colorChange: "",
  shapeChange: "",
};

// reducer to change the state of alert
export function event(state = initState, action) {
  switch (action.type) {
    case eventActions.EDIT_TEXT_START:
      return {
        ...state,
        editText: {
          ...state.editText,
          id: action.id,
          enable: true,
          changeText: action.text,
          positionX: action.positionX,
          positionY: action.positionY,
          height: action.height,
          width: action.width,
          scrollHeight: action.scrollHeight ? action.scrollHeight : 35,
        },
      };
    case eventActions.EDIT_TEXT_DOING:
      return {
        ...state,
        editText: {
          ...state.editText,
          id: action.id,
          changeText: action.text,
          scrollHeight: action.scrollHeight,
        },
      };
    case eventActions.EDIT_TEXT_END:
      return {
        ...state,
        editText: {
          ...state.editText,
          enable: false,
          changeText: action.text,
        },
      };
    case eventMaskCircle.MASK_CIRCLE_START:
      return {
        ...state,
        maskCircle: {
          count: ++state.maskCircle.count,
        },
      };
    case eventMaskCircle.MASK_CIRCLE_END:
      return {
        ...state,
        maskCircle: {
          count: --state.maskCircle.count,
        },
      };
    case eventHighLight.MASK_HIGHLIGHT_START:
      return {
        ...state,
        highLight: {
          count: ++state.highLight.count,
        },
      };
    case eventHighLight.MASK_HIGHLIGHT_END:
      return {
        ...state,
        highLight: {
          count: --state.highLight.count,
        },
      };
    case eventControl.REMOVE_ALL:
      return {
        ...state,
        maskCircle: {
          count: 0,
        },
        highLight: {
          count: 0,
        },
        removeAll: !state.removeAll,
      };
    case eventColorChange.COLOR_CHANGE:
      return {
        ...state,
        colorChange: action.payload,
      };
    case eventShapeChange.SHAPE_CHANGE:
      return {
        ...state,
        shapeChange: action.payload,
      };
    case eventSaveSelectedId.SELECT_ID:
      return {
        ...state,
        saveSelectedID: action.payload,
      };
    default:
      return state;
  }
}
