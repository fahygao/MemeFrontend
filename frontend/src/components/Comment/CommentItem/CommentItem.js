import React from "react";
import { useEffect } from "react";
import anymHead from "./../../../images/profilepics/anymHead.png";
import default_prof from "./../../../images/profilepics/default_prof.png";
import "./CommentItem.css";

const CommentItem = (props) => {
  return (
    <li className="list">
      <div className="comment-content">
        {props.items.anonymous ? (
          <img src={anymHead} className="comment-prof" />
        ) : (
          <img src={default_prof} className="comment-prof" />
        )}

        <span className="wrapper">
          <div className="username">
            {props.items.username} : {props.items.content}
          </div>
          <div className="time">
            {" "}
            {props.items.create_time.substring(0, 10)}
          </div>
        </span>
      </div>
    </li>
  );
};

export default CommentItem;
