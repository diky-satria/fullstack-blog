import { Button, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../interceptor/axios";
import { Switch } from "antd";
import ReactPaginate from "react-paginate";
import logo from "../../img/success-logo.png";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ToastSuccess from "../../components/common/ToastSuccess";
import ToastError from "../../components/common/ToastError";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Postingan() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const getAllPosts = async () => {
    let response = await axios.get(
      `/api/post?search=${search}&page=${page}&limit=${limit}`
    );

    setData(response.data.data);
    setPage(response.data.page);
    setTotalPage(response.data.total_page);
    setTotalRows(response.data.total_rows);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const changeSearchClick = () => {
    if (page === 1) {
      setTotalRows((val) => val + 1); // untuk rerender pagination
    }
    setPage(0);
    setSearch(tempSearch);
  };

  const hapusPost = async (id) => {
    try {
      let response = await axios.delete(`/api/post/delete/${id}`);

      getAllPosts();
      ToastSuccess(response.data.message, "top-right");
    } catch (e) {
      ToastError(e.message, "top-right");
    }
  };

  const onChangeStatus = async (e, id) => {
    try {
      let response = await axios.patch(`/api/post/status/${id}/${e}`);

      getAllPosts();
      ToastSuccess(response.data.message, "top-right");
    } catch (e) {
      ToastError(e.message, "top-right");
    }
  };

  return (
    <Div className="c-content">
      <div
        className="c-content-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h4>Postingan</h4>
          <p>Semua postingan{user.role !== "admin" ? "mu" : ""}</p>
        </div>
        <div>
          <NavLink
            to="/postingan/add"
            className="btn btn-sm btn-primary"
            style={{
              backgroundColor: "#5356FB",
              color: "white",
              border: "#5356FB",
              marginRight: "2px",
              float: "right",
              margin: "15px 0",
            }}
          >
            Tambah
          </NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari judul..."
                  aria-label="Cari judul..."
                  aria-describedby="button-addon2"
                  style={{
                    boxShadow: "none",
                    border: "1px solid #5356FB",
                  }}
                  value={tempSearch}
                  onChange={(e) => setTempSearch(e.target.value)}
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
                          <th>Judul</th>
                          <th>Deskripsi</th>
                          <th>Thumbnail</th>
                          <th>Dibuat</th>
                          <th>Diperbaharui</th>
                          {user.role === "admin" ? <th>Penulis</th> : ""}
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((d, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {page > 0
                                  ? page * limit + index + 1
                                  : index + 1}
                              </td>
                              <td
                                id={`judul${index}`}
                                style={{ cursor: "pointer" }}
                              >
                                {d.judul.length < 30
                                  ? d.judul
                                  : d.judul.substring(0, 30) + "..."}
                                <Tooltip
                                  anchorId={`judul${index}`}
                                  content={`${d.judul}`}
                                  place="top"
                                  style={{
                                    zIndex: 2000,
                                    backgroundColor: "#686868",
                                  }}
                                />
                              </td>
                              <td
                                id={`deskripsi${index}`}
                                style={{ cursor: "pointer" }}
                              >
                                {d.deskripsi.length < 30
                                  ? d.deskripsi
                                  : d.deskripsi.substring(0, 30) + "..."}
                                <Tooltip
                                  anchorId={`deskripsi${index}`}
                                  content={`${d.deskripsi}`}
                                  place="top"
                                  style={{
                                    zIndex: 2000,
                                    backgroundColor: "#686868",
                                  }}
                                />
                              </td>
                              <td>
                                <img
                                  src={`${process.env.REACT_APP_URL_API}/gambar/post/${d.thumbnail}`}
                                  alt={d.thumbnail}
                                  className="thumbnail-custom"
                                />
                              </td>
                              <td>{d.dibuat}</td>
                              <td>{d.diperbaharui}</td>
                              {user.role === "admin" ? <td>{d.name}</td> : ""}
                              <td>
                                {d.status === "pending" ? (
                                  <Switch
                                    key={d.id}
                                    defaultChecked={false}
                                    onChange={(e) => onChangeStatus(e, d.id)}
                                  />
                                ) : (
                                  ""
                                )}
                                {d.status === "publish" ? (
                                  <Switch
                                    key={d.id}
                                    defaultChecked={true}
                                    onChange={(e) => onChangeStatus(e, d.id)}
                                  />
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>
                                <Button
                                  size="small"
                                  style={{
                                    backgroundColor: "#5356FB",
                                    color: "white",
                                    border: "#5356FB",
                                    marginRight: "2px",
                                  }}
                                  onClick={() =>
                                    navigate(`/postingan/${d.id}/detail`)
                                  }
                                >
                                  Detail
                                </Button>
                                <Button
                                  size="small"
                                  style={{
                                    backgroundColor: "#12B0A2",
                                    color: "white",
                                    border: "#12B0A2",
                                    marginRight: "2px",
                                  }}
                                  onClick={() =>
                                    navigate(`/postingan/${d.id}/edit`)
                                  }
                                >
                                  Edit
                                </Button>
                                <Popconfirm
                                  placement="left"
                                  title={`Apa kamu yakin`}
                                  description={`ingin menghapus "${d.judul}"`}
                                  okText="Ya"
                                  cancelText="Tidak"
                                  onConfirm={() => hapusPost(d.id)}
                                >
                                  <Button type="primary" size="small" danger>
                                    Hapus
                                  </Button>
                                </Popconfirm>
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
                          onPageChange={handlePageClick}
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
                    <h6>Tidak ada postingan tersedia</h6>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  .page-link:focus {
    box-shadow: none !important;
  }
  .react-tooltip {
    width: 200px !important;
  }
  .thumbnail-custom {
    width: 100%;
    height: 50px !important;
    object-fit: cover !important;
    border-radius: 5px !important;
  }
`;
