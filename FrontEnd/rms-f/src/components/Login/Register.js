import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:5001/api/Authenticate/register/",
        {
          ...input,
        }
      );
      history.push("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center loginContainer h-75">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter Email"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              id="loginBtn"
              className="btn btn-primary btn-block loginBtn"
            >
              Register
            </Button>
          </Form>
          <div className="d-flex flex-column align-items-center mt-4">
            <span style={{ fontSize: "14px", color: "#61605d" }}>
              Already have an account?
            </span>
            <a href="/" className="registerLink">
              Login
            </a>
          </div>
        </Col>
      </div>
    </>
  );
};

export default Register;
