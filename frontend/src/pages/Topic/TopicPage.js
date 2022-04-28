import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Storylist from "../../components/Story/Storylist/Storylist";
import NavbarComp from "../../components/Header/NavbarComp";
import PopupPost from "../../components/Popup/PopupPost";
import { API_BASE_URL } from "../../utils/constants";
import profile from "./../../images/profilepics/profile.png";
import "./TopicPage.css";

const TopicPage = () => {
  //   let [userInfo, setUserInfo] = useState([]);

  let [topicInfo, setTopicInfo] = useState([]);
  let {
    authTokens,
    getTopicStorys,
    topicStorys,
    currentTopicId,
    getUserLiked,
  } = useContext(AuthContext);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const getDate = (date) => {
    date = date.split("-");
    let ret = date[0] + "年" + date[1] + "月" + date[2] + "日";
    return ret;
  };

  useEffect(() => {
    // document.body.style.overflow = "hidden";
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
      <NavbarComp />
      <section className="main-page">
        <div className="left">
          <div className="topicContainer">
            <div className="topicName">{topicInfo.topicName}</div>

            <div className="topicAbstract">
              <p>
                纽约的特别不仅在于美食美景和美人，更重要的是你与她的交集。
                我们相信对于每一位停留在纽约的人来说，都有一个属于你的故事。
              </p>
              <p>
                或长或短、或悲伤或愉快、或久远或崭新，都有值得被记录的意义。
              </p>
              <p>
                没准当我们听到了更多的故事后，
                我们会被治愈、会被感动、会被质疑、会被接受；
                从而更懂身边的人和自己，为什么而来。
              </p>
            </div>
            <div className="topicOther">
              By MēMē团队 •{" "}
              {getDate(String(topicInfo.create_time).substring(0, 10))}
            </div>

            <div className="topicOther">
              已有{topicStorys.length}条 • {userCount}
              个成员正在回忆纽约往事
            </div>

            <div className="buttons">
              <button
                type="button"
                className="btn btn-dark buttonWidth"
                onClick={() => {
                  setPostModalOpen(true);
                }}
              >
                发布
              </button>
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
