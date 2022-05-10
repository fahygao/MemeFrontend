import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div id="login-box">
      <form onSubmit={loginUser}>
        <div class="mb-3">
          <label class="form-label">用户名</label>
          <input
            type="text"
            class="form-control"
            id="username"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <input type="password" class="form-control" id="password" />
        </div>

        <button type="submit" class="btn btn-primary">
          登陆
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

/* <form onSubmit={loginUser}>
<input type="text" name="username" placeholder="Enter Username" />
<input type="password" name="password" placeholder="Enter Password" />
<input type="submit" />
</form> */
