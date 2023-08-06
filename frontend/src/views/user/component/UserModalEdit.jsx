import { Button, Form, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import ButtonCustom from "../../../components/common/ButtonCustom";
import axios from "../../../interceptor/axios";
import ToastSuccess from "../../../components/common/ToastSuccess";

export default function UserModalEdit({
  modalEdit,
  closeModalEdit,
  getAllUserUserAll,
  id,
  name,
  email,
  emailOld,
  setId,
  setName,
  setEmail,
  setEmailOld,
}) {
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const editUser = async () => {
    setLoading(true);
    try {
      let response = await axios.patch(`/api/user/${id}`, {
        name: name,
        email: email,
        emailOld: emailOld,
      });

      setLoading(false);
      getAllUserUserAll("edit");

      closeModalEdit();
      ToastSuccess(response.data.message, "top-right");
      setError([]);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.errors);
    }
  };

  const closeModalEditPush = () => {
    closeModalEdit();
    setError([]);
  };

  return (
    <Modal
      title="Edit User"
      open={modalEdit}
      onCancel={() => closeModalEditPush()}
      centered
      footer={[
        <Space key="1" direction="vertical">
          <Space wrap>
            <Button onClick={() => closeModalEditPush()}>Kembali</Button>
            <ButtonCustom text="Edit" loading={loading} click={editUser} />
          </Space>
        </Space>,
      ]}
    >
      <Input type="hidden" onChange={(e) => setId(e.target.value)} value={id} />
      <Input
        type="hidden"
        onChange={(e) => setEmailOld(e.target.value)}
        value={emailOld}
      />
      <div className="form-group mb-2 mt-4">
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
      <div className="form-group mb-2">
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
    </Modal>
  );
}
