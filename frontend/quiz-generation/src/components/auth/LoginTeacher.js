import React, { useState } from "react";
import axios from "axios";
import "./LoginTeacher.css";

import { Link } from "react-router-dom";
import { message, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";

function LoginTeacher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [passShow, setPassShow] = useState(false);

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8009/registerTeacher",
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Register Successfully");
        navigate("/dashboard");
        setIsSignUp(false);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8009/loginTeacher",
        values
      );
      dispatch(hideLoading());
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/teacherapp/students");
      } else {
        message.error(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <div className={`container12 ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="formss-container">
        <div className="signin-signup">
          <Form className="form sign-in-form" onFinish={onFinishHandler}>
            <h2 className="title">Sign in</h2>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                className="Doctorinput"
                prefix={<i className="fas fa-user" />}
                placeholder="your email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="Doctorinput"
                prefix={<i className="fas fa-lock" />}
                placeholder="Password"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="btinn solid">
              Login
            </Button>
          </Form>
          <Form className="form sign-up-form" onFinish={onFinish}>
            <h2 className="title">Sign up</h2>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="Doctorinput"
                prefix={<i className="fas fa-user" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                className="Doctorinput"
                prefix={<i className="fas fa-envelope" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="establishment"
              rules={[
                { required: true, message: "Please input your establishment!" },
              ]}
            >
              <Input
                className="Doctorinput"
                prefix={<i className="fas fa-envelope" />}
                placeholder="Establishment"
              />
            </Form.Item>
            <Form.Item
              name="classes"
              rules={[
                {
                  required: true,
                  message: "Please specify the classes you handle!",
                },
              ]}
            >
              <Input.TextArea
                className="Doctorinput"
                placeholder="Enter comma-separated class names (e.g., II1C, II2C ...)"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="Doctorinput"
                prefix={<i className="fas fa-lock" />}
                placeholder="Password"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="btinn">
              {isSignUp ? "Sign up" : "Login"}
            </Button>
          </Form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>

            <button className="btinn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <a href="/logincard">
            {/* <img src={reg} className="imagereg" alt="Register" /> */}
          </a>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>

            <button className="btinn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <a href="/LoginCard">
            {/* <img src={log} className="imagetbib" alt="Login" /> */}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginTeacher;
