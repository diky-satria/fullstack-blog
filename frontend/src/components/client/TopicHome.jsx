import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../interceptor/axios";
import { Tooltip } from "react-tooltip";

export default function TopicHome() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    getLatestPosts();
  }, []);

  const getLatestPosts = async () => {
    let response = await axios.get(`/api/beranda`);
    setData(response.data.data);
  };

  const splitTechstack = (val) => {
    var split = val.split(",");
    var data = [];

    for (var i = 0; i < split.length; i++) {
      data.push(split[i]);
    }

    return data;
  };

  const gotoDetail = (id) => {
    navigate(`/topic/${id}`);
  };

  return (
    <Div>
      {/* topic */}
      <section className="topic">
        <div className="container">
          <div className="row left">
            <div className="col">
              <h4>Topik paling baru</h4>
              <p>Ini adalah Topik paling baru yang ditambahkan</p>
            </div>
          </div>
          {data.length > 0 ? (
            <>
              <div className="row right">
                {data.map((d, index) => {
                  return (
                    <div
                      className="col-lg-4 col-xl-4 col-md-6 col-sm-12 mb-5"
                      key={index}
                    >
                      <img
                        src={`${process.env.REACT_APP_URL_API}/gambar/post/${d.thumbnail}`}
                        alt={d.thumbnail}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => gotoDetail(d.id)}
                      />
                      <div
                        style={{
                          margin: "10px 0",
                        }}
                      >
                        {splitTechstack(d.techstack).map((t, index) => {
                          return (
                            <span
                              className="badge rounded-pill bg-primary me-1 mb-1"
                              key={index}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                      <p id={`judul${index}`}>
                        {d.judul.length < 70
                          ? d.judul
                          : d.judul.substring(0, 70) + "..."}
                        <Tooltip
                          anchorId={`judul${index}`}
                          content={`${d.judul}`}
                          place="top"
                          style={{
                            zIndex: 2000,
                            backgroundColor: "#686868",
                          }}
                        />
                      </p>
                      <p className="author">Penulis: {d.name}</p>
                    </div>
                  );
                })}
              </div>
              <NavLink
                to="/topic"
                className="btn btn-lg btn-primary c-btn-client-2"
              >
                Selengkapnya {`>>>`}
              </NavLink>
            </>
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
                padding: "50px 0",
              }}
            >
              Topik belum tersedia
            </p>
          )}
        </div>
      </section>
      {/* end topic */}
    </Div>
  );
}

const Div = styled.div`
  /* topic */
  .topic {
    padding: 100px 0;
  }
  .topic .left h4 {
    font-weight: bold;
  }
  .topic .left p {
    color: #64748b;
    font-size: 12px;
  }
  .topic .right p {
    font-size: 14px;
    font-weight: 500;
  }
  .topic .right img {
    width: 100%;
    height: 200px;
    object-fit: cover !important;
    border-radius: 20px;
  }
  .badge.bg-primary {
    background-color: #5356fb !important;
    font-weight: 400;
    font-size: 12px;
  }
  .c-btn-client-2 {
    background-color: #5356fb !important;
    color: white !important;
    border-radius: 15px !important;
    font-size: 12px;
    float: right;
  }
  .author {
    font-size: 12px !important;
    color: #64748b;
  }
  /* end topic */
`;
