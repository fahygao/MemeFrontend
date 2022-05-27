import React, { useContext, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import AuthContext from "../../context/AuthContext";
import user_prof from "./../../images/profilepics/default_prof.png";
import anom_prof from "./../../images/profilepics/anymHead.png";
import "./PopupPost.css";

function PopupPost({ setOpenModal }) {
  let { postStory, getTopicStorys } = useContext(AuthContext);
  const [isAnom, setIsAnom] = useState(false);
  const [numWords, setNumWords] = useState(1000);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const year = new Date().getFullYear();
  const diff_year = 30;
  const years = Array.from(new Array(diff_year), (val, index) => year - index);
  const months = Array.from(new Array(12), (val, index) => index + 1);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  let handleOnSubmit = (e) => {
    e.preventDefault();
    e.target["lat"] = null;
    e.target["lng"] = null;
    if (coordinates.lat != null && coordinates.lng != null) {
      e.target["lat"] = coordinates.lat.toFixed(5);
      e.target["lng"] = coordinates.lng.toFixed(5);
    }
    postStory(e);
    setOpenModal(false);
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
              setOpenModal(false);
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

            <select id="year">
              {years.map((year, index) => {
                return (
                  <option key={`year${index}`} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <span className="date">年</span>
            <select id="month">
              {months.map((month, index) => {
                return (
                  <option key={`month${index}`} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <span className="date">月</span>
          </div>

          <div class="form-group form-row2 custom-input margin-left">
            <span className="date">于</span>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "* 发生地点",
                      className: "form-control margin-right autocomplete",
                      id: "location",
                    })}
                  />

                  <div className="dropdownDiv">
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = suggestion.active
                        ? { backgroundColor: "#c8c8c880", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>，

            <select
              className="form-select form-select exist"
              aria-label=".form-select-sm example"
              id="EXIST"
            >
              <option selected value="EXIST">
                该地仍然存在
              </option>
              <option value="EXISTED">该地已消失</option>
            </select>
          </div>
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
}

export default PopupPost;
