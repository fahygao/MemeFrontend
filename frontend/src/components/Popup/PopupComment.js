import React, { useState, useContext } from "react";
import "./PopupComment";
import anom_prof from "./../../images/profilepics/anymHead.png";
import user_prof from "./../../images/profilepics/default_prof.png";
import AuthContext from "../../context/AuthContext";

const PopupComment = () => {
  const [isAnom, setIsAnom] = useState(false);
  const [numWords, setNumWords] = useState(0);
  const { setPostCommentOpen, postComment } = useContext(AuthContext);

  let handleOnSubmit = (event) => {
    event.preventDefault();
    postComment(event);
    setPostCommentOpen(false);
    // getTopicStorys();
  };

  const toggle_prof = () => {
    if (isAnom) {
      setIsAnom(false);
    } else {
      setIsAnom(true);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setPostCommentOpen(false);
            }}
          >
            X
          </button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div class="form-group form-row">
            {isAnom ? (
              <img src={anom_prof} className="profile-pic" />
            ) : (
              <img src={user_prof} className="profile-pic" />
            )}
          </div>

          <div className="form-group margin-left">
            <textarea
              className="form-control textarea"
              id="commentContent"
              rows="4"
              placeholder="*发布你的评论～(300以内）"
              maxlength="300"
              minlength="5"
              onChange={(e) => setNumWords(e.target.value.length)}
            ></textarea>
          </div>
          <span class="word-count"> {numWords}/300 </span>
          <div className="footer">
            <div
              className="form-check  anonymous-logo"
              onClick={() => {
                toggle_prof();
              }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                id="anonymous"
              />
              <label className="form-check-label" for="gridCheck">
                匿名
              </label>
            </div>
            <button type="submit" className="btn btn-secondary">
              发布
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupComment;
