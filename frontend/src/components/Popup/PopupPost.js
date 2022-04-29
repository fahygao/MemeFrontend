import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import user_prof from "./../../images/profilepics/default_prof.png";
import anom_prof from "./../../images/profilepics/anymHead.png";
import "./PopupPost.css";

function PopupPost({ setOpenModal }) {
  let { postStory, getTopicStorys } = useContext(AuthContext);
  const [isAnom, setIsAnom] = useState(false);

  const [count, setCount] = useState(0);
  React.useEffect(() => {
    const wordCount = (event) => {
      // 中文字判断
      let Words = event.srcElement.value;
      let iTotal = 0;
      // 数字判断
      let inum = 0;
      for (let i = 0; i < Words.length; i++) {
        let c = Words.charAt(i);
        //基本汉字
        if (c.match(/[\u4e00-\u9fa5]/)) {
          iTotal++;
        }
        //基本汉字补充
        else if (c.match(/[\u9FA6-\u9fcb]/)) {
          iTotal++;
        }
        else if (c.match(/[0-9]/)) {
          inum++;
        }
      }
      setCount(inum + iTotal);
    };

    window.addEventListener('input', wordCount);

    // cleanup this component
    return () => {
      window.removeEventListener('input', wordCount);
    };
  });

  let handleOnSubmit = (event) => {
    event.preventDefault();
    postStory(event);
    setOpenModal(false);
    getTopicStorys();
  };

  const toggle_prof = () => {
    console.log("is running");
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
              placeholder="* 欢迎用任何题材和形式来分享属于你的那份回忆～(1000以内）"
              maxlength="1000"
            ></textarea>
          </div>

          <div>
            <span class="word-count"> 字数：{count}/1000 </span>
          </div>

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
