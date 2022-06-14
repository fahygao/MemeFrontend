import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Storylist from "../../components/Story/Storylist/Storylist";
import NavbarComp from "../../components/Header/NavbarComp";
import PopupPost from "../../components/Popup/PopupPost";
import PopupComment from "../../components/Popup/PopupComment";
import { API_BASE_URL } from "../../utils/constants";
import AlertModal from "../../components/Popup/AlertModal";
import LeafMap from "../../components/Map/LeafMap";
import right_arrow from "../../images/right_arrow.svg";
import mobile_next from "../../images/mobile_next.svg";
import mobile_post from "../../images/mobile_post.svg";
import PopupPostDefault from "../../components/Popup/PopupPostDefault";
import { useParams, useNavigate } from "react-router-dom";
import "./TopicPage.css";

const TopicPage = () => {
  //   let [userInfo, setUserInfo] = useState([]);
  let navigate = useNavigate();
  let [topicInfo, setTopicInfo] = useState([]);
  let {
    authTokens,
    getTopicStorys,
    topicStorys,
    getUserLiked,
    postCommentOpen,
    decodeNewline,
    alertModalOpen,
    getUserProf,
    topic_arr,
    setCurrTopicIndex,
    postModalDefaultOpen,
    setPostModalDefaultOpen,
    user,
  } = useContext(AuthContext);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const { id } = useParams();
  const [userCount, setUserCount] = useState(0);

  const topicParamIndex = topic_arr.findIndex((element) => {
    return element == id;
  });

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
    setCurrTopicIndex(topicParamIndex);
    getTopicStorys(id);
    getTopicInfo();
    getTotalUser();
    getUserLiked();
    getUserProf();
    window.scrollTo(0, 0);
  }, [id]);

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
    console.log(topicParamIndex);
    let nextTopicID = String(
      topic_arr[(topicParamIndex + 1) % topic_arr.length]
    );
    navigate("../topics/" + nextTopicID, { replace: true });
  };

  let getTopicInfo = async () => {
    let url = API_BASE_URL + "/Topics/" + id + "/";
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
      {postModalOpen && (
        <PopupPost setOpenModal={setPostModalOpen} topicInfo={topicInfo} />
      )}
      {postModalDefaultOpen && <PopupPostDefault topicInfo={topicInfo} />}

      {alertModalOpen && (
        <AlertModal message={"TA的个人手帐页正在开发中，敬请期待！"} />
      )}
      {postCommentOpen && <PopupComment />}
      <NavbarComp />
      <section className="main-page">
        <div
          className="nextTopic"
          onClick={() => {
            changeTopic();
          }}
        >
          #{"下个话题"} <img className="arrow" src={right_arrow} />
        </div>
        <div className="left">
          <div className="topicContainer">
            <div className="topicName" style={{ color: topicInfo.topic_color }}>
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
