import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import logo from "../img/success-logo.png";
import { NavLink } from "react-router-dom";

export default function Register() {
  return (
    <Div>
      <div className="c-login-container">
        <div className="c-login-header">
          <div className="c-login-logo text-center">
            <img src={logo} alt={logo} width={80} />
          </div>
          <div className="c-login-title my-4">
            <h4>Sign Up</h4>
          </div>
        </div>
        <div className="c-login-content">
          <form>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control c-form-control"
                type="password"
                placeholder="Password Confirmation"
              />
            </div>
          </form>
        </div>
        <div className="c-login-footer">
          <Button
            type="primary"
            size="large"
            className="c-btn-login"
            style={{
              backgroundColor: "#5356FB",
              border: "1px solid #5356FB",
            }}
          >
            Register
          </Button>

          <div
            style={{
              fontSize: "12px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Already have an account?
            <NavLink to="/auth" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "20px",
                  marginLeft: "5px",
                }}
              >
                Login now
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  background-color: #e2e2e2 !important;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .c-login-container {
    width: 300px;
    background-color: white;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 30px;
    border-radius: 10px;
  }
  .c-form-control {
    margin-bottom: 14px;
    box-shadow: none;
    padding: 9px 20px;
    border-radius: 20px;
    background-color: #e6e6ff;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    border: 1px solid transparent;
  }
  .c-form-control:focus {
    border: 1px solid #5356fb;
  }
  .c-form-control::placeholder {
    color: #a9a9a9;
  }
  .c-btn-login {
    border-radius: 20px;
    width: 100%;
  }
`;
