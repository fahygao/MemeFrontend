import React, { useState, useContext, useCallback } from "react";
import AuthContext from "../../../context/AuthContext";
import "./Storyitem.css";
import comment from "./../../../images/reply.svg";
import unfilled_heart from "./../../../images/unfilled_heart.svg";
import filled_heart from "./../../../images/filled_heart.svg";
import anymHead from "./../../../images/profilepics/anymHead.png";
import maleprof from "./../../../images/maleprof.svg";
import femaleprof from "./../../../images/femaleprof.svg";
import Commentlist from "../../Comment/CommentList/Commentlist";
import { API_BASE_URL } from "./../../../utils/constants";
import { useEffect } from "react";

const Storyitem = (props) => {
  //default set to datebase records

  const {
    authTokens,
    userLikedStorys,
    user,
    setCurrentStoryID,
    postCommentOpen,
    decodeNewline,
    setCoordinates,
    setZoom,
    setAlertModalOpen,
    // coordinates,
    // zoom,
  } = useContext(AuthContext);
  const [numLikes, setNumLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [showRest, setShowRest] = useState(false);
  const [gender, setGender] = useState(true);
  const [firstName, setFirstName] = useState(props.items.username);

  const content = props.items.content;
  const maxlen = 200;

  let chiChr = {
    0: "〇",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
  };

  let chiMonth = {
    "01": "一",
    "02": "二",
    "03": "三",
    "04": "四",
    "05": "五",
    "06": "六",
    "07": "七",
    "08": "八",
    "09": "九",
    10: "十",
    11: "十一",
    12: "十二",
  };
  let checkLiked = () => {
    for (let i = 0; i < userLikedStorys.length; i++) {
      if (userLikedStorys[i]["story_id"] === props.items.id) {
        setLiked(true);
        // console.log(props.items.id);
      }
    }
  };

  let getUserLogin = async () => {
    let userInfoUrl = API_BASE_URL + "/userLogin/" + props.items.user_id;
    let response = await fetch(userInfoUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    setGender(data.gender);
    // setFirstName(data.first_name);
    // console.log(data);
  };

  let getLikesAPI = async () => {
    let storyUrl =
      API_BASE_URL + "/StoryLikedByStory/?storyID=" + props.items.id;
    let response = await fetch(storyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setNumLikes(data.count);
  };

  let likeStory = async () => {
    let likeUrl = API_BASE_URL + "/likeStoryViewSet/";

    let response = await fetch(likeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: null,
        story_id: props.items.id,
        user_id: user.user_id,
      }),
    });
    // let data = await response.json();
  };

  //post updated new relations
  const setLikesAPI = () => {
    let exist = false;
    for (let i = 0; i < userLikedStorys.length; i++) {
      if (userLikedStorys[i]["story_id"] === props.items.id) {
        exist = true;
        break;
      }
    }
    if (!exist) {
      likeStory();
    }
  };

  const likePost = () => {
    if (!liked) {
      setLiked(true);
      setNumLikes((prev) => {
        return prev + 1;
      });
      setLikesAPI();
    }
  };

  const unlikePost = () => {
    if (liked) {
      setLiked(false);
      setNumLikes((prev) => {
        return prev - 1;
      });
      //   setLikesAPI();
    }
  };

  const getDate = () => {
    let temp = props.items.DateHappened;
    if (temp === null || temp.length == 0) {
      return "";
    }
    temp = temp.substring(0, 7);
    temp = temp.split("-");
    let ret = "";
    for (let i = 0; i < 4; i++) {
      ret = ret + chiChr[temp[0].charAt(i)];
    }
    ret = ret + "年 ";

    if (temp[1] != null) {
      if (temp[1].length == 1) {
        temp[1] = "0" + temp[1];
      }
      ret = ret + chiMonth[temp[1]] + "月";
    }
    return ret;
  };

  const renderTitle = () => {
    let ret = "";
    let location = props.items.location;
    let date = getDate();
    if (location !== null && location.length > 0) {
      if (location.includes(",")) {
        location = location.split(",")[0];
      }
      ret = ret + location;
      if (date.length > 0) {
        ret = ret + " - " + "🕙 " + date;
        return ret;
      }
    }
    if (date.length > 0 && ret == "") {
      return date;
    }
    return ret;
  };

  const getTimeBefore = () => {
    let currentTime = Date.parse(String(new Date()));
    let publishTime = Date.parse(props.items.create_time);
    let t = currentTime - publishTime;
    let cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.round((t - d * cd - h * ch) / 60000);

    if (m === 60) {
      h++;
      m = 0;
    }
    if (h === 24) {
      d++;
      h = 0;
    }
    let ret = "";
    if (d > 0) {
      if (props.items.create_time.includes("-")) {
        ret =
          props.items.create_time.split("T")[0] +
          " \xa0" +
          props.items.create_time.split("T")[1].slice(0, 5);
      }
      //       ret = String(d) + "天";
    } else {
      if (h > 0) {
        ret = ret + h + "小时";
      }
      ret = ret + m + "分钟前";
    }

    return ret;
  };

  let getComments = useCallback(async () => {
    // console.log("getcomment is called");

    // let url = API_BASE_URL + "/StoryComments?storyID=" + props.items.id + "/";
    let url = API_BASE_URL + "/StoryComments/?storyID=" + props.items.id;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setComments(data.results);
    } else if (response.statusText === "Unauthorized") {
      //   console.log(response.statusText);
    }
  }, [comments]);

  const clickComment = () => {
    getComments();
    setShowComments((prevState) => !prevState);
    setCurrentStoryID(props.items.id);
  };

  useEffect(() => {
    getComments();
  }, [postCommentOpen]);

  useEffect(() => {
    getLikesAPI();
    checkLiked();
    getUserLogin();
  }, []);

  const findMap = () => {
    // console.log(zoom);
    // console.log(coordinates);
    setCoordinates({
      lat: props.items.lat,
      lng: props.items.lon,
    });
    setZoom(18);
  };

  const getSubstring = (x) => {
    const xarr = x.split("<nl>");

    if (xarr.length > 6) {
      let i = 0;
      let count = 0;
      let ret = "";
      while (i < 6 && count < maxlen) {
        if (ret.length > 0) {
          ret = ret + "<nl>";
        }
        ret = ret + xarr[i];

        i += 1;
        count += xarr.length;
      }
      return ret + "  ...全文";
    }
    if (x.length < maxlen) {
      //with less than 6 new lines
      return x;
    }
    const set1 = new Set([",", ".", "。", "<", ">", "n", "l", " "]);
    let cutoff = maxlen;
    while (set1.has(String(x.charAt(cutoff - 1)))) {
      cutoff = cutoff - 1;
    }
    return x.substring(0, cutoff) + "  ...全文";
  };

  return (
    <li className="list">
      <div className="row">
        <div className="story-item">
          <div>
            {props.items.anonymous == 0 ? (
              <img
                src={gender ? maleprof : femaleprof}
                className="profile-pic1"
                alt="profile"
                onClick={() => setAlertModalOpen(true)}
              />
            ) : (
              <img src={anymHead} className="profile-pic" alt="profile" />
            )}
            <span className="username">
              {props.items.anonymous == 1 ? "@匿名" : "@" + firstName}
            </span>
            <span className="time">{getTimeBefore()}</span>
          </div>

          <div className="story-content">
            <div
              className="story-header"
              onClick={() => {
                findMap();
              }}
            >
              <span>📍</span>
              {renderTitle()}
            </div>
            <div>
              {showRest && (
                <span onClick={() => setShowRest(!showRest)}>
                  {decodeNewline(content)}
                </span>
              )}
              {!showRest && (
                <span onClick={() => setShowRest(!showRest)}>
                  {decodeNewline(getSubstring(content))}
                </span>
              )}
            </div>

            <span className="hashtag"> #纽约市的某地有关于我的记忆</span>
          </div>

          <div className="reactions">
            <span className="emoji_comments" onClick={() => clickComment()}>
              <img src={comment} />
              {comments.length}
            </span>

            <span className="emoji_likes">
              {liked ? (
                <img
                  src={filled_heart}
                  alt="filled_heart"
                  onClick={() => {
                    unlikePost();
                  }}
                />
              ) : (
                <img
                  src={unfilled_heart}
                  alt="heart"
                  onClick={() => {
                    likePost();
                  }}
                />
              )}{" "}
              {numLikes}
            </span>
          </div>

          {showComments && <Commentlist items={comments} />}
        </div>
      </div>
    </li>
  );
};

export default Storyitem;
