import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import "./Storyitem.css";
import comment from "./../../../images/comment.png";
import share from "./../../../images/share.png";
import unfilled_heart from "./../../../images/unfilled_heart.png";
import filled_heart from "./../../../images/filled_heart.png";
import anymHead from "./../../../images/profilepics/anymHead.png";
import default_prof from "./../../../images/profilepics/default_prof.png";
import { API_BASE_URL } from "./../../../utils/constants";
import { useEffect } from "react";
// import darkred from "./../../../images/profilepics/#8B0000.png"

const Storyitem = (props) => {
  //default set to datebase records
  const { authTokens, userLikedStorys, user } = useContext(AuthContext);
  const [numLikes, setNumLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  let checkLiked = () => {
    for (let i = 0; i < userLikedStorys.length; i++) {
      if (userLikedStorys[i]["story_id"] === props.items.id) {
        setLiked(true);
        // console.log(props.items.id);
      }
    }
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
    let data = await response.json();
    // console.log(data);
    // if (
    //   response.status === 200 ||
    //   response.status === 202 ||
    //   response.status === 201
    // ) {
    //   alert("post submitted successfully! ");
    // } else {
    //   alert("something went wrong");
    // }
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
      let likeUrl = API_BASE_URL + "/likeStoryViewSet/";
      //   console.log(likeUrl);
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
    let ret = temp[0] + "年";
    if (temp[1] != null) {
      ret = ret + temp[1] + "月";
    }
    return ret;
  };

  const renderTitle = () => {
    let ret = "";
    let location = props.items.location;
    let existed = props.items.Exist;
    let date = getDate();
    if (location !== null && location.length > 0) {
      ret = ret + location + "-" + existed;
      if (date.length > 0) {
        ret = ret + "-" + date;
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
      ret = String(d) + "天";
    }
    if (h > 0) {
      ret = ret + h + "小时";
    }
    ret = ret + m + "分钟前";
    return ret;
  };

  useEffect(() => {
    getLikesAPI();
    checkLiked();
  }, []);

  return (
    <li className="list">
      <div className="row">
        <div className="story-item">
          <div>
            {props.items.anonymous == 0 ? (
              <img src={default_prof} className="profile-pic" alt="profile" />
            ) : (
              <img src={anymHead} className="profile-pic" alt="profile" />
            )}
            <span className="username">
              {props.items.anonymous == 0
                ? "@" + props.items.username
                : "@匿名"}
            </span>
            <span className="time"> {getTimeBefore()}</span>
          </div>

          <div className="story-content">
            <div className="story-header">{renderTitle()}</div>
            {props.items.content}
            <span className="hashtag"> #纽约市的某地有关于我的记忆</span>
          </div>

          <div className="reactions">
            {/* <span className="emoji_nums">
              <img src={comment} />
              {props.items.num_comments}
            </span>
            <span className="emoji_nums">
              <img src={share} alt="share" /> 0
            </span> */}
            <span className="emoji_nums">
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
        </div>
      </div>
    </li>
  );
};

export default Storyitem;
