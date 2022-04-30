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

  let [currentTopicId, setCurrentTopicId] = useState(3);
  let [currentTopicName, setCurrentTopicName] = useState("Null");
  let [topicStorys, setTopicStorys] = useState([]);
  let [userLikedStorys, setUserLikedStorys] = useState([]);
  let [loading, setLoading] = useState(true);
  let [postCommentOpen, setPostCommentOpen] = useState(false);
  let [currentStoryID, setCurrentStoryID] = useState(-1);

  let navigate = useNavigate();
  // -----------------------------------------------------------------------------
  let loginUser = async (e) => {
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
      navigate("/");
    } else {
      alert("something went wrong");
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

  // -----------------------------------------------------------------------------
  let getTopicStorys = async () => {
    let url =
      API_BASE_URL + "/StoryListByTopic/?topicID=" + String(currentTopicId);
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
      console.log("post submitted successfully! ");
    } else {
      console.log("something went wrong");
    }
  };

  // -----------------------------------------------------------------------------
  let postStory = async (e) => {
    e.preventDefault();
    let storyUrl = API_BASE_URL + "/Storys/";

    let response = await fetch(storyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: null,
        title: "None",
        content: e.target.storyContent.value,
        visibility: "1",
        location: e.target.location.value,
        DateHappened: e.target.DateHappened.value,
        anonymous: e.target.anonymous.checked,
        Exist: e.target.EXIST.value,
        username: user.username,
        view_count: 0,
        create_time: null,
        parent_id: 7,
        topic_id: currentTopicId,
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
      alert("something went wrong");
    }
  };

  // -----------------------------------------------------------------------------
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    postStory: postStory,
    currentTopicId: currentTopicId,
    getTopicStorys: getTopicStorys,
    topicStorys: topicStorys,
    userLikedStorys: userLikedStorys,
    getUserLiked: getUserLiked,
    setUserLikedStorys: setUserLikedStorys,
    postCommentOpen: postCommentOpen,
    setPostCommentOpen: setPostCommentOpen,
    postComment: postComment,
    setCurrentStoryID: setCurrentStoryID,
  };

  useEffect(() => {
    let nineMinutes = 1000 * 60 * 9;

    if (loading && localStorage.getItem("authtokens") !== null) {
      console.log("hello");
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
