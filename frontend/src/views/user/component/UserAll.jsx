import React, { useState } from "react";
import logo from "../../../img/success-logo.png";
import { Button, Popconfirm, Switch } from "antd";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import UserModalEdit from "./UserModalEdit";
import ToastSuccess from "../../../components/common/ToastSuccess";
import ToastError from "../../../components/common/ToastError";
import axios from "../../../interceptor/axios";

export default function UserAll({
  data,
  page,
  setPage,
  limit,
  totalPage,
  totalRows,
  handlePageClick,
  changeSearch,
  getAllUser,
  setTotalRows,
}) {
  const [tempSearch, setTempSeacrh] = useState("");
  const [modalEdit, setModalEdit] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailOld, setEmailOld] = useState("");

  const openModalEdit = (id, name, email) => {
    setModalEdit(true);

    setId(id);
    setName(name);
    setEmail(email);
    setEmailOld(email);
  };

  const closeModalEdit = () => {
    setModalEdit(false);

    setId("");
    setName("");
    setEmail("");
    setEmailOld("");
  };

  const getAllUserUserAll = (type) => {
    type === "edit" ? getAllUser() : page === 0 ? getAllUser() : setPage(0);

    setId("");
    setName("");
    setEmail("");
    setEmailOld("");
  };

  const deleteUser = async (id) => {
    try {
      let response = await axios.delete(`/api/user/${id}`);

      getAllUserUserAll("delete");
      ToastSuccess(response.data.message, "top-right");
    } catch (e) {
      console.log(e);
      ToastError(e.response.data.message, "top-right");
    }
  };

  const handlePageClickUser = ({ selected }) => {
    return handlePageClick(selected);
  };

  const onChange = async (e, id) => {
    try {
      let response = await axios.patch(`/api/user/${id}/${e}`);

      getAllUserUserAll("edit");
      ToastSuccess(response.data.message, "top-right");
    } catch (e) {
      ToastError(e.message, "top-right");
    }
  };

  const changeSearchClick = () => {
    if (page === 1) {
      setTotalRows((val) => val + 1); // untuk rerender pagination
    }
    changeSearch(tempSearch); // untuk pencarian data di table
  };

  return (
    <Div>
      <div className="card">
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Cari nama, email, role..."
              aria-label="Cari nama, email, role..."
              aria-describedby="button-addon2"
              style={{
                boxShadow: "none",
                border: "1px solid #5356FB",
              }}
              value={tempSearch}
              onChange={(e) => setTempSeacrh(e.target.value)}
            />
            <button
              className="btn"
              type="button"
              id="button-addon2"
              style={{
                backgroundColor: "#5356FB",
                color: "white",
              }}
              onClick={() => changeSearchClick()}
            >
              Cari
            </button>
          </div>
          {data.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {page > 0 ? page * limit + index + 1 : index + 1}
                          </td>
                          <td>{d.name}</td>
                          <td>{d.email}</td>
                          <td>{d.role}</td>
                          <td>
                            <Switch
                              key={d.id}
                              defaultChecked={d.status ? true : false}
                              onChange={(e) => onChange(e, d.id)}
                              disabled={d.role === "admin" ? true : false}
                            />
                          </td>
                          <td>
                            <Button
                              size="small"
                              style={{
                                backgroundColor: "#12B0A2",
                                color: "white",
                                border: "#12B0A2",
                                marginRight: "2px",
                              }}
                              onClick={() =>
                                openModalEdit(d.id, d.name, d.email)
                              }
                            >
                              Edit
                            </Button>
                            {d.role !== "admin" ? (
                              <Popconfirm
                                placement="left"
                                title={`Apa kamu yakin?`}
                                description={`ingin menghapus "${d.name}"`}
                                onConfirm={() => deleteUser(d.id)}
                                okText="Ya"
                                cancelText="Tidak"
                              >
                                <Button type="primary" size="small" danger>
                                  Hapus
                                </Button>
                              </Popconfirm>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div className="col">
                  <p>
                    Total: {totalRows} - Halaman: {totalRows ? page + 1 : 0}{" "}
                    dari {totalPage}
                  </p>
                </div>
                <div className="col">
                  <nav
                    aria-label="Page navigation example"
                    style={{ float: "right" }}
                    key={totalRows}
                  >
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="»"
                      onPageChange={handlePageClickUser}
                      pageCount={totalPage}
                      previousLabel="«"
                      containerClassName="pagination"
                      pageLinkClassName="page-link"
                      previousLinkClassName="page-link"
                      nextLinkClassName="page-link"
                      activeClassName="page-item active"
                      // disabledLinkClassName=""
                    />
                  </nav>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <img src={logo} alt="logo" width={70} />
                <h6>Tidak ada user tersedia</h6>
              </div>
            </div>
          )}
        </div>
      </div>
      <UserModalEdit
        modalEdit={modalEdit}
        closeModalEdit={closeModalEdit}
        getAllUserUserAll={(type) => getAllUserUserAll(type)}
        id={id}
        name={name}
        email={email}
        emailOld={emailOld}
        setId={setId}
        setName={setName}
        setEmail={setEmail}
        setEmailOld={setEmailOld}
      />
    </Div>
  );
}

const Div = styled.div`
  .page-link:focus {
    box-shadow: none !important;
  }
`;
