import React from "react";
import { useEffect, useContext } from "react";
import anymHead from "./../../../images/profilepics/anymHead.png";
import default_prof from "./../../../images/profilepics/default_prof.png";
import "./CommentItem.css";
import shareIcon from "../../../images/share.svg";
import AuthContext from "../../../context/AuthContext";

const CommentItem = (props) => {
  let niming = "匿名";
  const { setPostCommentOpen, setCommentDefault } = useContext(AuthContext);
  const clickPost = () => {
    let shareUser = props.items.anonymous ? niming : props.items.username;
    shareUser = "@" + shareUser;
    setCommentDefault(shareUser);
    setPostCommentOpen(true);
  };
  return (
    <li className="list">
      <div className="comment-content">
        <div className="leftFlex">
          {props.items.anonymous ? (
            <img src={anymHead} className="comment-prof" />
          ) : (
            <img src={default_prof} className="comment-prof" />
          )}

          <span className="wrapper">
            <div className="username">
              {props.items.anonymous ? niming : props.items.username} :{" "}
              {props.items.content}
            </div>
            <div className="time">
              {" "}
              {props.items.create_time.substring(0, 10)}
            </div>
          </span>
        </div>
        <img
          src={shareIcon}
          onClick={() => {
            clickPost();
          }}
          className="shareIcon"
        ></img>
      </div>
    </li>
  );
};

export default CommentItem;
