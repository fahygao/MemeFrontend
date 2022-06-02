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
    postDefaultStory,
    getTopicStorys,
    userGender,
    setPostModalDefaultOpen,
  } = useContext(AuthContext);
  const [isAnom, setIsAnom] = useState(false);
  const [numWords, setNumWords] = useState(1000);

  let handleOnSubmit = (e) => {
    e.preventDefault();
    postDefaultStory(e);
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
      <div className="modalContainer_default">
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
          <div class="form-group form-row_default">
            {isAnom ? (
              <img src={anom_prof} className="profile-pic-popup" />
            ) : (
              <img
                src={userGender ? maleprof : femaleprof}
                className="profile-pic-popup"
              />
            )}
          </div>

          <div class="form-group form-row2_default custom-input margin-left_default"></div>
          <div className="form-group margin-left_default">
            <textarea
              className="form-control textarea"
              id="storyContent"
              rows="6"
              placeholder="发布你的动态～#味道：一把通往不同时空的钥匙"
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
              <span className="submit-text">发布</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupPostDefault;
