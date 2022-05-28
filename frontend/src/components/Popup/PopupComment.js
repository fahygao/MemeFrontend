import React, { useState, useContext } from "react";
import "./PopupComment";
import anom_prof from "./../../images/profilepics/anymHead.png";
import user_prof from "./../../images/profilepics/default_prof.png";
import maleprof from "./../../images/maleprof.svg";
import femaleprof from "./../../images/femaleprof.svg";
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";
import { API_BASE_URL } from "../../utils/constants";

const PopupComment = () => {
  const [isAnom, setIsAnom] = useState(false);
  const [numWords, setNumWords] = useState(300);
  const {
    setPostCommentOpen,
    postComment,
    commentDefault,
    setCommentDefault,
    user,
    authTokens,
  } = useContext(AuthContext);
  const [gender, setGender] = useState(true);
  let handleOnSubmit = (event) => {
    event.preventDefault();
    postComment(event);
    setCommentDefault("");
    setPostCommentOpen(false);

    // getTopicStorys();
  };

  let getGender = async () => {
    let userInfoUrl = API_BASE_URL + "/userLogin/" + user.user_id;
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

  const toggle_prof = () => {
    if (isAnom) {
      setIsAnom(false);
    } else {
      setIsAnom(true);
    }
  };

  useEffect(() => {
    getGender();
  }, []);

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
            X
          </button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div class="form-group form-row">
            {isAnom ? (
              <img src={anom_prof} className="profile-pic" />
            ) : (
              <img
                src={gender ? maleprof : femaleprof}
                className="profile-pic"
              />
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
