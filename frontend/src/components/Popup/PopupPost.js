import React, { useContext, useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import AuthContext from "../../context/AuthContext";
import anom_prof from "./../../images/profilepics/anymHead.png";
import maleprof from "./../../images/maleprof.svg";
import close_button from "./../../images/close_button.svg";
// import { API_BASE_URL } from "../../utils/constants";
import "./PopupPost.css";

function PopupPost(props) {
  let { postStory, getTopicStorys, userProf } = useContext(AuthContext);
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

  let handleOnSubmit = (e) => {
    e.preventDefault();
    e.target["lat"] = null;
    e.target["lng"] = null;
    if (coordinates.lat != null && coordinates.lng != null) {
      e.target["lat"] = coordinates.lat.toFixed(5);
      e.target["lng"] = coordinates.lng.toFixed(5);
    }
    postStory(e);
    props.setOpenModal(false);
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
              props.setOpenModal(false);
            }}
          >
            <img src={close_button} className="close-button_memo" />
          </button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div class="form-group form-row">
            {isAnom ? (
              <img src={anom_prof} className="profile-pic-popup" />
            ) : (
              <img
                src={userProf ? images[userProf] : maleprof}
                className="profile-pic-popup"
              />
            )}

            <div className="dates-popup">
              <span className="date-popup">回忆发生于</span>
              <select id="year" className="border-control">
                {years.map((year, index) => {
                  return (
                    <option key={`year${index}`} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <span className="date-popup"> 年</span>
              <select id="month" className="border-control">
                {months.map((month, index) => {
                  return (
                    <option key={`month${index}`} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
              <span className="date-popup"> 月</span>
            </div>
          </div>

          <div class="form-group form-row2 custom-input margin-left">
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
                <div id="autocomplete-widen">
                  <input
                    {...getInputProps({
                      placeholder: "* 地点",
                      className: "form-control1 margin-right autocomplete",
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
            </PlacesAutocomplete>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="exist" />
              <label className="form-check-label" for="gridCheck">
                <span className="exist-check">该地已消失</span>
              </label>
            </div>
            {console.log(props.topicInfo)}
          </div>
          <div className="form-group margin-left">
            <textarea
              className="form-control textarea"
              id="storyContent"
              rows="6"
              placeholder={props.topicInfo.placeholder_txt.replaceAll(
                "<nl>",
                "\n"
              )}
              maxlength="1000"
              minlength="1"
              onChange={(e) => setNumWords(1000 - e.target.value.length)}
            ></textarea>
          </div>
          <span class="word-count_memo"> {numWords} </span>
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
            <button
              type="submit"
              className="btn btn-sm btn-dark submitbutton_memo"
            >
              <span className="submit-text">发布</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupPost;
