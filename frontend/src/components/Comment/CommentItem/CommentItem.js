import React from "react";
import { useEffect, useContext, useState } from "react";
import anymHead from "./../../../images/profilepics/anymHead.png";
import maleprof from "./../../../images/maleprof.svg";
import femaleprof from "./../../../images/femaleprof.svg";
import "./CommentItem.css";
import shareIcon from "../../../images/reply.svg";
import AuthContext from "../../../context/AuthContext";
import { API_BASE_URL } from "../../../utils/constants";

const CommentItem = (props) => {
  let niming = "匿名";
  const { setPostCommentOpen, setCommentDefault, authTokens } =
    useContext(AuthContext);
  const [gender, setGender] = useState(true);

  let getGender = async () => {
    let userInfoUrl = API_BASE_URL + "/userLogin/" + props.items.user_id;
    let response = await fetch(userInfoUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    setGender(data.gender);
  };
  useEffect(() => {
    getGender();
  }, []);

  const clickPost = () => {
    let shareUser = props.items.anonymous ? niming : props.items.username;
    shareUser = "@" + shareUser;
    setCommentDefault(shareUser);
    setPostCommentOpen(true);
  };
  return (
    <li className="list">
      <div className="commentItem-content">
        <div className="leftFlex">
          {props.items.anonymous ? (
            <img src={anymHead} className="comment-prof" />
          ) : (
            <img
              src={gender ? maleprof : femaleprof}
              className="comment-prof"
            />
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
          className="reply1"
          onClick={() => {
            clickPost();
          }}
        ></img>
      </div>
    </li>
  );
};

export default CommentItem;
