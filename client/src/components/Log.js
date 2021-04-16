import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../redux/action-creaters/auth.actions";
function Log({ loginUser, setFlag }) {
  const [form, setForm] = useState({ email: "", password: "", login: "" });
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const [errorMassage, setError] = useState("");
  const loginHandler = async () => {
    try {
      const responce = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password: form.password, login: form.login }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await responce.json();
      if (responce.status === 200) {
        loginUser(data.token, data.userId, data.login);
      } else {
        setError(data.massage);
      }
    } catch (e) {
      console.log("Error");
    }
  };
  return (
    <div>
      <div>
        <button
          className="btn in-out-btn btn-outline-success "
          onClick={() => {
            setFlag(true);
          }}
        >
          Регистрация
        </button>
      </div>
      <div className="from-container">
        <form>
          <h1>Вход</h1>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="login"
              onChange={changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={changeHandler}
            ></input>
          </div>

          <button
            type="button"
            onClick={loginHandler}
            className="btn btn-outline-success"
          >
            Submit
          </button>
          <p>{errorMassage}</p>
        </form>
      </div>
    </div>
  );
}
const mapDispath = {
  loginUser: login,
};
const connector = connect(null, mapDispath);
export default connector(Log);
