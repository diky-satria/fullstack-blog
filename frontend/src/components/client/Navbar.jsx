import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineAlignRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Select } from "antd";
import axios from "../../interceptor/axios";
import { searchChange } from "../../redux/search/action";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [topik, setTopik] = useState([]);

  useEffect(() => {
    getAllTopicForSelect();
  }, []);

  const getAllTopicForSelect = async () => {
    let response = await axios.get(`/api/topik_select`);
    setTopik(response.data.data);
  };

  const searchTopik = (e) => {
    setModal(false);
    navigate(`/topic/${e}`);
    dispatch(searchChange(e));
  };

  return (
    <Div>
      {/* navbar */}
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            Tips n Trick
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <AiOutlineAlignRight
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <NavLink to="/" className="nav-item">
                Beranda
              </NavLink>
              <NavLink to="/topic" className="nav-item">
                Topik
              </NavLink>
              {user ? (
                <NavLink to="/user" className="nav-item">
                  Dashboard
                </NavLink>
              ) : (
                ""
              )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control c-form-control-search"
                type="search"
                placeholder="Cari topik..."
                aria-label="Search"
                readOnly
                onClick={() => setModal(true)}
              />
            </form>
          </div>
        </div>
      </nav>
      {/* end navbar */}

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        zIndex={5000}
        closable={false}
        className="navbar-modal"
      >
        <Select
          showSearch
          style={{
            width: "100%",
          }}
          className="c-ant-select"
          placeholder="Cari topik mu disini..."
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          // allowClear
          // value={""}
          onChange={(e) => searchTopik(e)}
          options={topik}
        />
      </Modal>
    </Div>
  );
}

const Div = styled.div`
  /* navbar */
  .navbar {
    padding: 10px 0;
    background-color: transparent !important;
    border-bottom: 1px solid #d9dfe7;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
  }
  .navbar-brand {
    font-weight: bold;
    color: #5356fb;
    font-size: 27px;
    font-family: "Permanent Marker", cursive !important;
  }
  .navbar-toggler {
    border: 1px transparent;
    box-shadow: none;
    color: #5356fb;
  }
  .navbar-toggler span {
    color: #5356fb !important;
  }
  .navbar-nav .nav-item {
    padding: 8px 15px;
    text-decoration: none;
    color: #64748b;
    margin: 0 5px;
    margin-bottom: 5px;
  }
  .navbar-nav .nav-item.active,
  .navbar-nav .nav-item:hover {
    background-color: #5356fb;
    border-radius: 15px;
    color: white;
  }
  .c-form-control-search {
    box-shadow: none;
    padding: 8px;
    border-radius: 15px;
    background-color: #eaf8ff;
  }
  .c-form-control-search:focus,
  .c-form-control-search:hover {
    border: 2px solid #5356fb;
  }
  .c-form-control-search::placeholder {
    padding: 0 15px;
  }
  .navbar-collapse {
    padding: 15px;
  }
  /* navbar */

  @media (min-width: 992px) {
    /* navbar */
    .navbar-nav .nav-item {
      margin-bottom: 0 !important;
    }
    .navbar-collapse {
      padding: 0 !important;
    }
    /* end navbar */
  }
`;
