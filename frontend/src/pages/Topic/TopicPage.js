import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Storylist from "../../components/Story/Storylist/Storylist";
import NavbarComp from "../../components/Header/NavbarComp";
import PopupPost from "../../components/Popup/PopupPost";
import PopupComment from "../../components/Popup/PopupComment";
import { API_BASE_URL } from "../../utils/constants";
import profile from "./../../images/profilepics/profile.png";
import AlertModal from "../../components/Popup/AlertModal";
import "./TopicPage.css";
import LeafMap from "../../components/Map/LeafMap";
import right_arrow from "../../images/right_arrow.svg";
import mobile_next from "../../images/mobile_next.svg";
import mobile_post from "../../images/mobile_post.svg";
import PopupPostDefault from "../../components/Popup/PopupPostDefault";

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
    alertModalOpen,
    getUserGender,
    setCurrentTopicId,
    CurrentTopicId,
    postModalDefaultOpen,
    setPostModalDefaultOpen,
    user,
  } = useContext(AuthContext);

  const [postModalOpen, setPostModalOpen] = useState(false);

  const [userCount, setUserCount] = useState(0);
  const [creator, setCreator] = useState("loading...");

  let [rightTopic, setRightTopic] = useState("味道：一把通往不同时空的钥匙");

  const getDate = (date) => {
    date = date.split("-");
    let ret = date[0] + "年" + date[1] + "月" + date[2] + "日";
    return ret;
  };

  //   let getCreator = async () => {
  //     // let creatorId = parseInt(topicInfo.creator.split("/")[-2]);
  //     // console.log(creatorId);
  //     let userInfoUrl = API_BASE_URL + "/userLogin/" + creatorId + "/";
  //     let response = await fetch(userInfoUrl, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + String(authTokens.access),
  //       },
  //     });

  //     let data = await response.json();
  //   };

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
    getUserGender();
    // getCreator();
    window.scrollTo(0, 0);
  }, [currentTopicId]);

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

  let changeTopic = () => {
    if (currentTopicId == 3) {
      setRightTopic("纽约的某地有关于我的回忆");
      //   setRightTopic("敬请期待");
      setCurrentTopicId(4);
    }
    if (currentTopicId == 4) {
      setRightTopic("味道：一把通往不同时空的钥匙");
      setCurrentTopicId(3);
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
      {postModalDefaultOpen && <PopupPostDefault />}

      {alertModalOpen && (
        <AlertModal message={"TA的个人手帐页正在开发中，敬请期待！"} />
      )}
      {postCommentOpen && <PopupComment />}
      <NavbarComp />
      <section className="main-page">
        <div className="left">
          <div className="topicContainer">
            <div className="topicName">
              {topicInfo.topicName == undefined
                ? "加载中"
                : topicInfo.topicName}
            </div>

            <div className="topicAbstract">
              {decodeNewline(topicInfo.abstract)}
            </div>

            <div className="topicOther">
              By {topicInfo.id == 4 ? "Jiaozi" : "词堂团队"} •{" "}
              {getDate(String(topicInfo.create_time).substring(0, 10))}
            </div>

            <div className="topicOther">
              已有{topicStorys.length}条 • {topicInfo.num_followers}
              位成员{topicInfo.member_action}
            </div>

            <div className="buttons1">
              <button
                type="button"
                className="btn btn-dark buttonWidth"
                onClick={() => {
                  topicInfo.requires_address
                    ? setPostModalOpen(true)
                    : setPostModalDefaultOpen(true);
                }}
              >
                {topicInfo.button_prompt}
              </button>
            </div>
            {topicInfo.requires_address ? (
              <div className="leafmap">
                <LeafMap items={topicStorys} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="right">
          <section id="topic-storys">
            <Storylist items={topicStorys} topicInfo={topicInfo} />
          </section>

          <div
            className="nextTopic"
            onClick={() => {
              changeTopic();
            }}
          >
            #{rightTopic} <img className="arrow" src={right_arrow} />
          </div>
        </div>

        <div className="mobile-nextTopic">
          <span className="mobile-post">
            <img
              src={mobile_post}
              onClick={() => {
                topicInfo.requires_address
                    ? setPostModalOpen(true)
                    : setPostModalDefaultOpen(true);
              }}
            />
          </span>
          <img
            src={mobile_next}
            onClick={() => {
              changeTopic();
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default TopicPage;
