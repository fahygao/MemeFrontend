import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";
// import profile from "./../../images/profilepics/#8B0000.png";
import maleprof from "./../../images/maleprof.svg";
import femaleprof from "./../../images/femaleprof.svg";
import menu from "./../../images/menu.svg";
import { useEffect } from "react";
import { API_BASE_URL } from "./../../utils/constants";
import { useNavigate } from "react-router-dom";

const NavbarComp = () => {
  let { user, logoutUser, authTokens } = useContext(AuthContext);
  let state = { date: new Date() };
  let [gender, setGender] = useState(true);
  let navigate = useNavigate();

  let getGender = async () => {
    let userInfoUrl = API_BASE_URL + "/userLogin/" + user.user_id;
    let response = await fetch(userInfoUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    setGender(data.gender);
  };

  useEffect(() => {
    getGender();
  }, []);

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

        <div className="date">
          {`${state.date.getFullYear()}年 ${
            state.date.getMonth() + 1
          } 月  ${state.date.getDate()} 日`}
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Navbar.Brand>
              <img
                src={gender ? maleprof : femaleprof}
                alt="React Bootstrap logo"
                width="30px"
                className="headerProf"
              />
            </Navbar.Brand>
            {/* <Nav.Link href="About">About</Nav.Link> */}
            <Nav.Link href="about">用户守则</Nav.Link>
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
