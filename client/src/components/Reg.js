import React from "react";
import { useState } from "react";
function Reg({  setFlag }) {
  const [form, setForm] = useState({ email: "", password: "", login: "" });
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const [errorMassage, setError] = useState("");
  const registerHandler = async () => {
    try {
      const responce = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await responce.json();
      setError(data.massage);
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
            setFlag(false);
          }}
        >
          Войти
        </button>
      </div>
      <div className="from-container">
        <form>
          <h1>Регистрация</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputText" className="form-label">
              Login
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputText"
              name="login"
              onChange={changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={changeHandler}
            ></input>
          </div>

          <button
            type="button"
            className="btn btn-outline-success"
            onClick={registerHandler}
          >
            Submit
          </button>
          <p>{errorMassage}</p>
        </form>
      </div>
    </div>
  );
}

export default Reg;
