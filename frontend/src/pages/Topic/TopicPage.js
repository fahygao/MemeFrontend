import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Storylist from "../../components/Story/Storylist/Storylist";
import NavbarComp from "../../components/Header/NavbarComp";
import PopupPost from "../../components/Popup/PopupPost";
import PopupComment from "../../components/Popup/PopupComment";
import { API_BASE_URL } from "../../utils/constants";
import profile from "./../../images/profilepics/profile.png";
import "./TopicPage.css";
import LeafMap from "../../components/Map/LeafMap";

const TopicPage = () => {
  //   let [userInfo, setUserInfo] = useState([]);

  let [topicInfo, setTopicInfo] = useState([]);
  let {
    authTokens,
    getTopicStorys,
    topicStorys,
    currentTopicId,
    getUserLiked,
    postCommentOpen,
    decodeNewline,
  } = useContext(AuthContext);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const getDate = (date) => {
    date = date.split("-");
    let ret = date[0] + "年" + date[1] + "月" + date[2] + "日";
    return ret;
  };

  useEffect(() => {
    // let w = document.documentElement.clientWidth || window.innerWidth;
    // if (w <= 750) {
    //   document.body.style.overflow = "auto";
    // } else {
    //   document.body.style.overflow = "hidden";
    // }
    //  document.body.style.overflow = "hidden";
    getTopicStorys();
    getTopicInfo();
    getTotalUser();
    getUserLiked();
  }, []);

  let getTotalUser = async () => {
    let url = API_BASE_URL + "/userLogin/";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setUserCount(data.count);
    } else if (response.statusText === "Unauthorized") {
      alert("cannot get user count");
    }
  };

  let getTopicInfo = async () => {
    let url = API_BASE_URL + "/Topics/" + String(currentTopicId) + "/";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setTopicInfo(data);
    } else if (response.statusText === "Unauthorized") {
      alert("cannot load topic info");
    }
  };

  return (
    <div>
      {postModalOpen && <PopupPost setOpenModal={setPostModalOpen} />}
      {postCommentOpen && <PopupComment />}
      <NavbarComp />
      <section className="main-page">
        <div className="left">
          <div className="topicContainer">
            <div className="topicName">{topicInfo.topicName}</div>

            <div className="topicAbstract">
              {decodeNewline(topicInfo.abstract)}
            </div>

            <div className="topicOther">
              By MēMē团队 •{" "}
              {getDate(String(topicInfo.create_time).substring(0, 10))}
            </div>

            <div className="topicOther">
              已有{topicStorys.length}条 • {userCount}
              位成员正在回忆纽约往事
            </div>

            <div className="buttons">
              <button
                type="button"
                className="btn btn-dark buttonWidth"
                onClick={() => {
                  setPostModalOpen(true);
                }}
              >
                开始回忆
              </button>
            </div>
            <div className="leafmap">
              <LeafMap />
            </div>
          </div>
        </div>

        <div className="right">
          <section id="topic-storys">
            <Storylist items={topicStorys} />
          </section>
        </div>
      </section>
    </div>
  );
};

export default TopicPage;
