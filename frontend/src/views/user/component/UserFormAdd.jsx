import { Form, Input } from "antd";
import React, { useState } from "react";
import ButtonCustom from "../../../components/common/ButtonCustom";
import ToastSuccess from "../../../components/common/ToastSuccess";
import axios from "../../../interceptor/axios";

export default function UserFormAdd({ getAllUser, page, setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const add = async () => {
    setLoading(true);
    try {
      let response = await axios.post(`/api/user`, {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });

      setLoading(false);
      getAllUserUserAll();

      ToastSuccess(response.data.message, "top-right");
    } catch (e) {
      setLoading(false);
      setError(e.response.data.errors);
    }
  };

  const getAllUserUserAll = () => {
    page === 0 ? getAllUser() : setPage(0);

    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setError([]);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="mb-4">Tambah User</h5>
        <div className="form-group mt-2">
          <label>Nama</label>
          <Form>
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </Form>
          {error && error.param === "name" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-2">
          <label>Email</label>
          <Form>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
          </Form>
          {error && error.param === "email" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <Form>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form>
          {error && error.param === "password" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-2">
          <label>Konfirmasi Password</label>
          <Form>
            <Input
              type="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              value={passwordConfirmation}
            />
          </Form>
          {error && error.param === "passwordConfirmation" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <ButtonCustom text="Tambah" loading={loading} click={add} />
      </div>
    </div>
  );
}
