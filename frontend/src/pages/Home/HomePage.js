import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComp from "../../components/Header/NavbarComp";
import "./HomePage.css";

const HomePage = () => {
  let [userInfo, setUserInfo] = useState([]);
  let [recentFeeds, setRecentFeeds] = useState([]);
  let { user, authTokens, logoutUser } = useContext(AuthContext);

  //currently only getting user id 3's info, need to use useContext to get actaully userID, will UPDATE later
  let getUserInfo = async () => {
    let url = "http://127.0.0.1:8000/userInfo/" + String(user.user_id) + "/";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setUserInfo(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <NavbarComp />

      <section className="main-page">
        <div className="left-home">
          <div className="logo"> MĒMĒ</div>
        </div>
        <div className="right-home">
          <section id="recent-feeds">
            <p>Hi {user.username}!, 今天你能来真好！今天发生了什么吗？</p>
            <h3 className="header">最新动态</h3>
          </section>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
