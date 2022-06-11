import React, { useState, useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import { API_BASE_URL } from "../../../utils/constants";
import maleprof from "./../../../images/maleprof.svg";
import femaleprof from "./../../../images/femaleprof.svg";
import anymHead from "./../../../images/profilepics/anymHead.png";
import "./NotificationItem.css";
//   useEffect(()=>{
//       getStory()
//   },[])

const NotificationItem = (props) => {
  const [story, setStory] = useState("");
  const { authTokens, decodeNewline, setPostCommentOpen, setCommentDefault } =
    useContext(AuthContext);

  let action_mapper = {
    LIKED: "赞了你",
    COMMENTED: "评论了你",
  };

  let getStory = async () => {
    let url = API_BASE_URL + "/Storys/" + String(props.items.story_id) + "/";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setStory(data);
    } else if (response.statusText === "Unauthorized") {
      alert("user is unauthorized; can't load Storys");
    } else {
      console.log("error contact eric");
    }
  };

  useEffect(() => {
    getStory();
  }, []);
  return (
    <li>
      <div className="noti-col">
        {console.log(typeof props.items.Action)}
        <div className="story-content">
          <div className="story-header">
            {props.items.profile_pic == -1 ? (
              <img src={anymHead} className="profile-pic" alt="profile" />
            ) : (
              <img src={maleprof} className="profile-pic1" alt="profile" />
            )}
            <span>
              @{props.items.username} {action_mapper[props.items.Action]}
            </span>
            <div className="noti-message">
              {props.items.Action == "COMMENTED" && props.items.message}
            </div>
          </div>
        </div>

        <div className="noti-story">
          {story.content === undefined
            ? "加载中..."
            : decodeNewline(story.content.substring(0, 200))}
        </div>
        <div
          className="noti-reply"
          onClick={() => {
            setPostCommentOpen(true);
            setCommentDefault("@" + props.items.username);
          }}
        >
          回复
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
{
  /* <div className="noti-main">
      <div>{props.items.message}</div>
      <div>{decodeNewline(story.content)}</div>
    </div>
  ); */
}
