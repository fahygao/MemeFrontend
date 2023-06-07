import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
const AuthContext = createContext();

export default AuthContext;

// pass in value we want to be made avialble across applications
export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authtokens")
      ? jwt_decode(localStorage.getItem("authtokens"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authtokens")
      ? JSON.parse(localStorage.getItem("authtokens"))
      : null
  );

  //   let [currentTopicName, setCurrentTopicName] = useState("Null");
  let [topicStorys, setTopicStorys] = useState([]);
  let [Notifications, setNotifications] = useState([]);
  let [userLikedStorys, setUserLikedStorys] = useState([]);
  let [loading, setLoading] = useState(true);
  let [postCommentOpen, setPostCommentOpen] = useState(false);
  let [currentStoryID, setCurrentStoryID] = useState(-1);
  let [currentStoryInfo, setCurrentStoryInfo] = useState(-1);
  let [commentDefault, setCommentDefault] = useState("");
  let [alertModalOpen, setAlertModalOpen] = useState(false);
  let [postModalDefaultOpen, setPostModalDefaultOpen] = useState(false);
  let [userProf, setProf] = useState(true);
  let topic_arr = [3, 4, 5];
  let [currTopicIndex, setCurrTopicIndex] = useState(0);

  //Change to the one belonging to the particular topic LATER!!
  const [coordinates, setCoordinates] = useState({
    lat: 40.7294,
    lng: -73.9972,
  });
  const [zoom, setZoom] = useState(11);

  let navigate = useNavigate();
  // -----------------------------------------------------------------------------
  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    let url = API_BASE_URL + "/api/token/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    //we want to set it in our state (and local storage) to be used for private routes later
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authtokens", JSON.stringify(data));
      navigate("/topics/" + topic_arr[0]);
    } else {
      alert("something went wrong");
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("user register form submitted");
    const prof_str =
      e.target.male.checked == 1 ? "maleprof.svg" : "femaleprof.svg";
    let url = API_BASE_URL + "/createuser/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value,
        gender: e.target.male.checked,
        social_media: e.target.social_media.value,
        profile_pic: prof_str,
      }),
    });
    let data = await response.json();
    //we want to set it in our state (and local storage) to be used for private routes later

    //we want to set it in our state (and local storage) to be used for private routes later
    if (
      response.status === 200 ||
      response.status === 202 ||
      response.status === 201
    ) {
      console.log("registration submitted successfully! ");
      alert("注册成功！");
      navigate("../login", { replace: true });
    } else {
      console.log("注册失败");
      console.log(data);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authtokens");
    navigate("/login");
  };

  // -----------------------------------------------------------------------------
  //When we login we get a access and refresh token, we send the refresh token to the backend to get a new access token
  //called every 9 minutes
  let updateToken = async () => {
    console.log("updateToken called");
    let url = API_BASE_URL + "/api/token/refresh/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh, //incase auth token has not been updated yet
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authtokens", JSON.stringify(data));
    } else {
      logoutUser();
      console.log("refresh token update failed");
    }

    if (loading) {
      setLoading(false);
    }
  };

  let getNotifications = async () => {
    let url = API_BASE_URL + "/Notifications/?userID=" + String(user.user_id);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotifications(data.results);
      //   console.log(data.results);
    } else if (response.statusText === "Unauthorized") {
      alert("user is unauthorized; can't load Notifications");
    } else if (response.status === 404) {
      console.log("user does not have notifications");
    } else {
      console.log("error requesting user notifications");
    }
  };

  // -----------------------------------------------------------------------------

  let createNotification = async (e) => {
    e.preventDefault();
    let notificationUrl = API_BASE_URL + "/Notifications/";
    let message = "";
    let profpic = userProf; //delete later
    if (e.target.commentContent) {
      message = e.target.commentContent.value;
    }

    let response = await fetch(notificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: null,
        user_id: e.target.user_id, //person who wrote the story, will recieve notification
        notifier: user.user_id, //person commenting or liking == logged in user
        message: message,
        username: user.username, //logged in user's username
        Action: "COMMENTED", //NEED TO ADD MANUALLY
        seen: false,
        create_time: null,
        story_id: currentStoryInfo.id,
        profile_pic: profpic, //NEED TO CHANGE LATER
      }),
    });

    let data = await response.json();

    if (
      response.status === 200 ||
      response.status === 202 ||
      response.status === 201
    ) {
      alert("notification submitted successfully! ");
    } else {
      alert(response.status);
    }
  };

  // -----------------------------------------------------------------------------
  let getTopicStorys = async (topicID) => {
    let url = API_BASE_URL + "/StoryListByTopic/?topicID=" + topicID;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setTopicStorys(data.results);
      //   console.log(data.results);
    } else if (response.statusText === "Unauthorized") {
      alert("user is unauthorized; can't load Storys");
    } else {
      alert("error contact eric");
    }
  };
  // -----------------------------------------------------------------------------
  let getUserLiked = async () => {
    let url = API_BASE_URL + "/StoryLikedByUser/?userID=" + user.user_id;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setUserLikedStorys(data.results);

      //   console.log(data.results);
    } else if (response.statusText === "Unauthorized") {
      alert("user is unauthorized; can't load geruserliked");
    } else {
      alert("error contact eric");
    }
  };

  let postComment = async (e) => {
    e.preventDefault();
    let commentUrl = API_BASE_URL + "/StoryComments/";
    console.log(currentStoryID);
    let response = await fetch(commentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: null,
        story_id: currentStoryID,
        user_id: user.user_id,
        content: e.target.commentContent.value,
        parent_id: 17,
        anonymous: e.target.anonymous.checked,
        emoji: 1,
        username: user.username,
      }),
    });

    let data = await response.json();

    //we want to set it in our state (and local storage) to be used for private routes later
    if (
      response.status === 200 ||
      response.status === 202 ||
      response.status === 201
    ) {
      alert("comment submitted successfully! ");

      //generate notification:
      e.target["Action"] = "COMMENTED";
      e.target["user_id"] = currentStoryInfo.user_id;
      createNotification(e);
    } else {
      console.log("something went wrong");
    }
  };

  let getUserProf = async () => {
    let userInfoUrl = API_BASE_URL + "/userLogin/" + user.user_id + "/";
    let response = await fetch(userInfoUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    setProf(data.profile_pic);
  };

  // replace \n with <nl>
  let encodeNewline = (txt) => {
    let ret = txt.split("\n").join("<nl>");
    return ret;
  };

  //if fulltext == true, show all txt
  //else shows partial text with ...全文
  let decodeNewline = (txt, fulltext) => {
    let ret = String(txt).split("<nl>");
    let main = ret
      .filter((s) => !s.includes("  ...全文"))
      .map((str) => <p>{str}</p>);

    // console.log(main);
    let suffix = ret
      .filter((s) => s.includes("  ...全文"))
      .map((str) => (
        <p>
          {str.substring(0, str.length - 7)}
          <span style={{ color: "grey" }}> ...全文</span>
        </p>
      ));

    main.push(suffix);
    return main;
  };

  let postDefaultStory = async (e) => {
    e.preventDefault();
    let storyUrl = API_BASE_URL + "/Storys/";
    // console.log("values");
    let content = encodeNewline(e.target.storyContent.value);

    let response = await fetch(storyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: null,
        title: "None",
        content: content,
        visibility: "1",
        location: null,
        DateHappened: null,
        anonymous: false,
        lat: -1,
        lon: -1,
        Exist: "EXIST",
        username: user.username,
        view_count: 0,
        create_time: null,
        parent_id: 7,
        topic_id: topic_arr[currTopicIndex],
        user_id: user.user_id,
        num_comments: 0,
        num_shares: 0,
        num_likes: 0,
      }),
    });

    let data = await response.json();

    //we want to set it in our state (and local storage) to be used for private routes later
    if (
      response.status === 200 ||
      response.status === 202 ||
      response.status === 201
    ) {
      alert("post submitted successfully! ");
    } else {
      //   alert("something went wrong");
      console.log("something went wrong");
    }
  };

  // -----------------------------------------------------------------------------
  let postStory = async (e) => {
    e.preventDefault();
    let storyUrl = API_BASE_URL + "/Storys/";
    // console.log("values");
    let content = encodeNewline(e.target.storyContent.value);
    let exist_val = e.target.exist.checked ? "EXISTED" : "EXIST";
    let year = e.target.year.value;
    let month = e.target.month.value;
    let dateHappen = year + "-" + month;

    let response = await fetch(storyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: null,
        title: "None",
        content: content,
        visibility: "1",
        location: e.target.location.value,
        DateHappened: dateHappen,
        anonymous: e.target.anonymous.checked,
        lat: e.target.lat,
        lon: e.target.lng,
        Exist: exist_val,
        username: user.username,
        view_count: 0,
        create_time: null,
        parent_id: 7,
        topic_id: topic_arr[currTopicIndex],
        user_id: user.user_id,
        num_comments: 0,
        num_shares: 0,
        num_likes: 0,
      }),
    });

    let data = await response.json();

    //we want to set it in our state (and local storage) to be used for private routes later
    if (
      response.status === 200 ||
      response.status === 202 ||
      response.status === 201
    ) {
      alert("post submitted successfully! ");
    } else {
      //   alert("something went wrong");
      console.log("something went wrong");
    }
  };

  // -----------------------------------------------------------------------------
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    postStory: postStory,
    getTopicStorys: getTopicStorys,
    topicStorys: topicStorys,
    userLikedStorys: userLikedStorys,
    getUserLiked: getUserLiked,
    setUserLikedStorys: setUserLikedStorys,
    postCommentOpen: postCommentOpen,
    setPostCommentOpen: setPostCommentOpen,
    postComment: postComment,
    setCurrentStoryID: setCurrentStoryID,
    decodeNewline: decodeNewline,
    registerUser: registerUser,
    commentDefault: commentDefault,
    setCommentDefault: setCommentDefault,
    zoom: zoom,
    setZoom: setZoom,
    coordinates: coordinates,
    setCoordinates: setCoordinates,
    alertModalOpen: alertModalOpen,
    setAlertModalOpen: setAlertModalOpen,
    getUserProf: getUserProf,
    userProf: userProf,
    getNotifications: getNotifications,
    Notifications: Notifications,
    postModalDefaultOpen: postModalDefaultOpen,
    setPostModalDefaultOpen: setPostModalDefaultOpen,
    postDefaultStory: postDefaultStory,
    currentStoryInfo: currentStoryInfo,
    setCurrentStoryInfo: setCurrentStoryInfo,
    currTopicIndex: currTopicIndex,
    setCurrTopicIndex: setCurrTopicIndex,
    topic_arr: topic_arr,
    // encodeNewline: encodeNewline,
  };

  useEffect(() => {
    let nineMinutes = 1000 * 60 * 9;

    if (loading && localStorage.getItem("authtokens") !== null) {
      //if page is loaded/refreshed, get a new access token with the refresh token (i.e. access token may have expired, but refresh token has not)
      updateToken();
    } else if (loading) {
      //nothing in local storage direct to login page
      //first time ever to open up browser
      setLoading(false);
    }

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, nineMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
