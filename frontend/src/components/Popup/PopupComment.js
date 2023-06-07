import React, { useState, useContext } from "react";
import "./PopupPost.css";
import anom_prof from "./../../images/profilepics/anymHead.png";
import close_button from "./../../images/close_button.svg";
import AuthContext from "../../context/AuthContext";

const PopupComment = () => {
  const [isAnom, setIsAnom] = useState(false);
  const [numWords, setNumWords] = useState(300);
  const {
    setPostCommentOpen,
    postComment,
    commentDefault,
    setCommentDefault,
    userProf,
  } = useContext(AuthContext);
  let handleOnSubmit = (event) => {
    event.preventDefault();
    postComment(event);
    setCommentDefault("");
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

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("./../../images", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setPostCommentOpen(false);
              setCommentDefault("");
            }}
          >
            <img src={close_button} className="close-button" />
          </button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div class="form-group form-row">
            {isAnom ? (
              <img src={anom_prof} className="profile-pic-popup" />
            ) : (
              <img
                src={userProf ? images[userProf] : images["maleprof.svg"]}
                className="profile-pic-popup"
              />
            )}
          </div>

          <div className="form-group margin-left">
            <textarea
              className="form-control1 textarea-comment"
              id="commentContent"
              rows="4"
              placeholder="*爱评论的人运气都不差～"
              maxlength="300"
              minlength="1"
              onChange={(e) => setNumWords(300 - e.target.value.length)}
            >
              {commentDefault}
            </textarea>
          </div>
          <span class="word-count">{numWords} </span>
          <div className="footer">
            <div className="form-check  anonymous-logo">
              <input
                className="form-check-input"
                type="checkbox"
                id="anonymous"
                onClick={() => {
                  toggle_prof();
                }}
              />
              <label className="form-check-label" for="gridCheck">
                匿名
              </label>
            </div>
            <button type="submit" className="btn btn-dark  submitbutton">
              <span className="submit-text ">发布</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupComment;
