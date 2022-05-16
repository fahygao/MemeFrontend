import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignupPage = () => {
  let navigate = useNavigate();

  let { registerUser } = useContext(AuthContext);

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
    if (valid_password(e.target.username.value, e.target.password.value)) {
      registerUser(e);
    }
  };

  const routeChange = () => {
    navigate("../login", { replace: true });
  };

  return (
    <div id="login-box">
      <form onSubmit={formValidation}>
        <div class="mb-3">
          <label class="form-label">用户名</label>
          <input
            type="username"
            class="form-control"
            id="username"
            aria-describedby="passwordHelp"
          />
          <small id="passwordHelpBlock" class="form-text text-muted">
            150 个字符或更少。 仅限字母、数字和@/./+/-/_。
          </small>
        </div>

        <div class="mb-3">
          <label class="form-label">密码</label>
          <input type="password" class="form-control" id="password" />
          <small id="passwordHelpBlock" class="form-text text-muted">
            您的邮箱不能和您的用户名过于接近. 您的密码必须至少包含 8 个字符。
            您的密码不能是常用密码。 您的密码不能完全数字。
          </small>
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1">邮箱</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
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
            placeholder="optional"
          />
        </div>
        <div>
          <label for="validationDefaultUsername">性别 </label>
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
            <button type="submit" class="btn btn-primary">
              完成注册
            </button>
            <button onClick={routeChange} class="btn btn-primary">
              返回
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;

/* <form onSubmit={loginUser}>
<input type="text" name="username" placeholder="Enter Username" />
<input type="password" name="password" placeholder="Enter Password" />
<input type="submit" />
</form> */
