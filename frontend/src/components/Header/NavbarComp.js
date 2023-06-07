import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const NavbarComp = () => {
  let { user, logoutUser, userProf } = useContext(AuthContext);
  let state = { date: new Date() };
  let navigate = useNavigate();

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

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("./../../images", false, /\.(png|jpe?g|svg)$/)
  );

  const getDate = () => {
    let year = "" + state.date.getFullYear();
    let month = "" + (state.date.getMonth() + 1);
    let date = "" + state.date.getDate();
    let ret = "";
    for (let i = 0; i < 4; i++) {
      ret = ret + chiChr[year[i]];
    }
    ret = ret + "年 ";

    if (month.length == 1) {
      month = "0" + month;
    }
    ret = ret + chiMonth[month] + "月";

    if (date.length == 1) {
      date = "0" + date;
    }
    if (date[0] != "0") {
      ret = ret + chiChr[date[0]] + "十";
    }
    if (date[1] != "0") {
      ret = ret + chiChr[date[1]];
    }
    ret = ret + "日";
    return ret;
  };

  return (
    <Navbar
      expand="lg"
      bg="none"
      variant="light"
      sticky="top"
      className="navbar"
    >
      <Container className="navbar-inner">
        <Navbar.Brand
          className="navLogo"
          onClick={() => {
            navigate("../", { replace: true });
          }}
        >
          MĒMĒ
        </Navbar.Brand>

        <div className="date">{`${getDate()}`}</div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Navbar.Brand>
              <img
                src={userProf ? images[userProf] : images["maleprof.svg"]}
                alt="React Bootstrap logo"
                width="30px"
                className="headerProf"
                onClick={() => {
                  navigate("../profile", { replace: true });
                }}
              />
            </Navbar.Brand>
            {/* <Nav.Link href="About">About</Nav.Link> */}
            <Nav.Link className="rightmost" href="about">
              用户守则
            </Nav.Link>
            {user ? (
              <Nav.Link onClick={logoutUser}>登出</Nav.Link>
            ) : (
              <Nav.Link href="login">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
