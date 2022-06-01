import React, { useContext, useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import AuthContext from "../../context/AuthContext";
import user_prof from "./../../images/profilepics/default_prof.png";
import anom_prof from "./../../images/profilepics/anymHead.png";
import maleprof from "./../../images/maleprof.svg";
import femaleprof from "./../../images/femaleprof.svg";
import close_button from "./../../images/close_button.svg";
import { API_BASE_URL } from "../../utils/constants";
import "./PopupPostDefault.css";

function PopupPostDefault() {
  let {
    postStory,
    getTopicStorys,
    authTokens,
    userGender,
    setPostModalDefaultOpen,
  } = useContext(AuthContext);
  const [isAnom, setIsAnom] = useState(false);
  const [numWords, setNumWords] = useState(1000);

  const year = new Date().getFullYear();
  const diff_year = 30;

  let handleOnSubmit = (e) => {
    e.preventDefault();

    postStory(e);
    setPostModalDefaultOpen(false);
    getTopicStorys();
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
              setPostModalDefaultOpen(false);
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
                src={userGender ? maleprof : femaleprof}
                className="profile-pic-popup"
              />
            )}
          </div>

          <div class="form-group form-row2 custom-input margin-left"></div>
          <div className="form-group margin-left">
            <textarea
              className="form-control textarea"
              id="storyContent"
              rows="6"
              placeholder="* 欢迎用任何题材和形式来分享你的回忆"
              maxlength="1000"
              minlength="1"
              onChange={(e) => setNumWords(1000 - e.target.value.length)}
            ></textarea>
          </div>
          <span class="word-count"> {numWords} </span>
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
              <label className="form-check-label exist-check" for="gridCheck">
                匿名
              </label>
            </div>
            <button type="submit" className="btn btn-sm btn-dark submitbutton">
              <span className="submit-text">提交</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupPostDefault;
