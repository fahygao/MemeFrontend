import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import user_prof from "./../../images/profilepics/default_prof.png";
import anom_prof from "./../../images/profilepics/anymHead.png";
import "./PopupPost.css";

function PopupPost({ setOpenModal }) {
    let { postStory, getTopicStorys } = useContext(AuthContext);
    const [isAnom, setIsAnom] = useState(false);
    const [numWords, setNumWords] = useState(1000);

    let handleOnSubmit = (event) => {
        event.preventDefault();
        postStory(event);
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

                        <input
                            className="form-control margin-right"
                            id="location"
                            placeholder="* 回忆发生的具体地点"
                        />

                        <input
                            className="form-control"
                            id="DateHappened"
                            placeholder="发生时间 (yyyy-mm)"
                        />
                    </div>
                    <div class="form-group form-row custom-input margin-left">
                        <select
                            className="form-select form-select"
                            aria-label=".form-select-sm example"
                            id="EXIST"
                        >
                            <option selected value="EXIST">
                                * 具体地点仍然存在
                            </option>
                            <option value="EXISTED">* 具体地点已消失</option>
                        </select>
                    </div>
                    <div className="form-group margin-left">
                        <textarea
                            className="form-control textarea"
                            id="storyContent"
                            rows="4"
                            placeholder="* 欢迎用任何题材和形式来分享属于你的那份回忆～"
                            maxlength="1000"
                            minlength="1"
                            onChange={(e) => setNumWords(1000 - e.target.value.length)}
                        ></textarea>
                    </div>
                    <span class="word-count"> {numWords} </span>
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
}

export default PopupPost;