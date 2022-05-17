import React, { useState, useContext } from "react";
import "./PopupComment";
import anom_prof from "./../../images/profilepics/anymHead.png";
import user_prof from "./../../images/profilepics/default_prof.png";
import AuthContext from "../../context/AuthContext";

const PopupComment = () => {
  const [isAnom, setIsAnom] = useState(false);
  const [numWords, setNumWords] = useState(300);
  const { setPostCommentOpen, postComment, commentDefault, setCommentDefault } =
    useContext(AuthContext);

  let handleOnSubmit = (event) => {
    event.preventDefault();
    postComment(event);
    setPostCommentOpen(false);
    setCommentDefault("");
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
              placeholder="*爱评论的人运气都不差～"
              maxlength="300"
              minlength="1"
              autoFocus="autofocus"
              onChange={(e) => setNumWords(300 - e.target.value.length)}
            >
              {commentDefault}
            </textarea>
          </div>
          <span class="word-count">{numWords} </span>
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
