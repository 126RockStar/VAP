import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAllAnnotations } from "../../actions/event.actions";
import "./Annotations.scss";

export const TopBar = () => {
  const dispatch = useDispatch();

  const doSomeAction = () => {
    console.log("Do Something!");
  };

  const removeAll = () => {
    dispatch(removeAllAnnotations());
  };
  return (
    <div className="top-bar-controls">
      <button onClick={doSomeAction} className="save-exit-btn">
        SAVE & EXIT
      </button>
      <button onClick={doSomeAction} className="preview-btn">
        PREVIEW
      </button>
      <button onClick={removeAll} className="undo-btn">
        REMOVE ALL
      </button>
    </div>
  );
};
