import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/constants";
import "./Signup.css";

const SignupPage = () => {
  let navigate = useNavigate();
  let [numUsers, setNumUsers] = useState(0);
  let { registerUser } = useContext(AuthContext);

  //   let getNumUsers = async () => {
  //     let url = API_BASE_URL + "/PublicInfo/1";
  //     let response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let data = await response.json();
  //     console.log(data);
  //     if (response.status === 200) {
  //       setNumUsers(data.num_registered_users);
  //       //   console.log(data.results);
  //     } else if (response.statusText === "Unauthorized") {
  //       alert("user is unauthorized; can't load Storys");
  //     } else {
  //       alert("error contact eric");
  //     }
  //   };

  //   useEffect(() => {
  //     console.log("hello");
  //     getNumUsers();
  //   }, []);

  function longestCommonSubsequence(a, b, ratio) {
    const matrix = Array(a.length + 1)
      .fill()
      .map(() => Array(b.length + 1).fill(0));
    for (let i = 1; i < a.length + 1; i++) {
      for (let j = 1; j < b.length + 1; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = 1 + matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
        }
      }
    }
    let longest = matrix[a.length][b.length];
    if (longest / a.length > ratio || longest / b.length > ratio) {
      return true; //they are too SIMILAR
    } else {
      return false;
    }
  }

  let valid_password = (username, password) => {
    if (password.length < 8) {
      alert("您的密码长度需要大于8个字符");
      return false;
    }
    if (
      longestCommonSubsequence(
        username.toLowerCase(),
        password.toLowerCase(),
        0.8
      )
    ) {
      alert("您的账号密码过于相似");
      return false;
    }

    if (/^\d+$/.test(password)) {
      alert("您的密码不能全是数字");
      return false;
    }
    return true;
  };

  const formValidation = (e) => {
    e.preventDefault();
    if (!e.target.email.value.endsWith("edu")) {
      alert("请用 .edu 结尾的邮箱注册");
    } else if (
      valid_password(e.target.username.value, e.target.password.value)
    ) {
      registerUser(e);
    }
  };

  const routeChange = () => {
    navigate("../login", { replace: true });
  };

  return (
    <div id="login-box">
      <div className="main_title_about2">
        <p>欢迎, 您是第 58 位来到么么的朋友！</p>
      </div>

      <form onSubmit={formValidation}>
        <div class="mb-3">
          <label class="form-label">用户名*</label>
          <input
            type="username"
            class="form-control"
            id="username"
            aria-describedby="passwordHelp"
            placeholder="取个什么好呢"
          />
          <small id="passwordHelpBlock" class="form-text text-muted">
            150 个字符或更少。 仅限字母、数字和@/./+/-/_。
          </small>
        </div>

        <div class="mb-3">
          <label class="form-label">密码*</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="宝，长可以，别忘了就好"
          />
          <small id="passwordHelpBlock" class="form-text text-muted">
            您的密码不能和您的用户名过于接近.
          </small>
          <br />
          <small id="passwordHelpBlock" class="form-text text-muted">
            您的密码必须至少包含 8 个字符。
          </small>
          <br />
          <small id="passwordHelpBlock" class="form-text text-muted">
            您的密码不能完全数字。
          </small>
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1">学校邮箱*</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="目前仅支持北美学校，谢谢理解！"
          />
          <small id="emailHelp" class="form-text text-muted">
            我们不会将您的邮箱与任何人分享。
          </small>
        </div>

        <div class="mb-3">
          <label for="form-label">Instagram账号/微信ID</label>
          <input
            type="text"
            class="form-control"
            id="social_media"
            placeholder="例如：IG：elonMusk"
          />
        </div>
        <div>
          <label for="validationDefaultUsername">性别* </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="male"
            value="option1"
          />
          <label class="form-check-label" for="inlineRadio1">
            男
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="female"
            value="option2"
          />
          <label class="form-check-label" for="inlineRadio2">
            女
          </label>
        </div>
        <div>
          {" "}
          <br></br>
          <div className="buttons">
            {" "}
            <button onClick={routeChange} class="btn btn-primary">
              返回
            </button>
            <button type="submit" class="btn btn-primary">
              完成注册
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
