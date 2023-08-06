import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import logo from "../img/success-logo.png";
import axios from "../interceptor/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ResetPassword() {
  const { user } = useSelector((state) => state.auth);

  const { email, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/user");
      } else {
        navigate("/postingan");
      }
    }
  }, [user, navigate]);

  const resetPassword = async () => {
    setLoading(true);
    try {
      let response = await axios.patch(
        `/api/auth/reset_password/${email}/${token}`,
        {
          password: password,
          konfirmasi_password: konfirmasiPassword,
        }
      );
      setLoading(false);
      navigate("/auth");
      toast.success(response.data.msg, {
        position: "top-right",
        duration: 6000,
        iconTheme: {
          primary: "#1bff1f",
          secondary: "#000000",
        },
        style: {
          borderRadius: "10px",
          background: "#1bff23",
          color: "#000000",
        },
      });
    } catch (e) {
      setError(e.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <Div>
      <div className="c-login-container">
        <div className="c-login-header">
          <div className="c-login-logo text-center">
            <img src={logo} alt={logo} width={80} />
          </div>
          <div className="c-login-title my-4">
            <h4>Reset Password</h4>
          </div>
        </div>
        <div className="c-login-content">
          {(error && error.param === "email") ||
          (error && error.param === "token") ? (
            <div className="alert alert-danger c-alert-danger" role="alert">
              {error.msg}
            </div>
          ) : (
            ""
          )}
          <div className="form-group">
            <input
              type="password"
              className="form-control c-form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && error.param === "password" ? (
              <small
                className="form-text"
                style={{ color: "red", marginLeft: "10px" }}
              >
                {error.msg}
              </small>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control c-form-control"
              placeholder="Konfirmasi Password"
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
            />
            {error && error.param === "konfirmasi_password" ? (
              <small
                className="form-text"
                style={{ color: "red", marginLeft: "10px" }}
              >
                {error.msg}
              </small>
            ) : (
              ""
            )}
          </div>
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
            onClick={resetPassword}
            loading={loading}
          >
            Reset sekarang
          </Button>

          <div
            style={{
              fontSize: "12px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            @Copyright 2023 BLOG <br />
            dibuat oleh{" "}
            <a
              href="https://dikysatria.net"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              Diky satria
            </a>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  background-image: linear-gradient(to bottom right, white, #d4f2ff) !important;
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
    box-shadow: 1px 1px 5px #dcdcdc;
  }
  .c-form-control {
    margin-top: 15px;
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
    margin-top: 15px;
  }
  .c-alert-danger {
    border-radius: 20px;
  }
`;
