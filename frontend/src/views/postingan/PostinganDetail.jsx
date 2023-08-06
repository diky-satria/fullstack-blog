import React, { useEffect, useState } from "react";
import axios from "../../interceptor/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export default function PostinganDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetail = async () => {
    try {
      let response = await axios.get(`/api/post/${id}`);

      setData(response.data.data);
    } catch (e) {
      navigate("/postingan");
    }
  };

  const splitTechstack = (val) => {
    var split = val.split(",");
    var data = [];

    for (var i = 0; i < split.length; i++) {
      data.push(split[i]);
    }

    return data;
  };

  return (
    <Div className="c-content">
      <section className="detail-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-mg-g col-sm-12 mb-3 left">
              <img
                src={`${process.env.REACT_APP_URL_API}/gambar/post/${data.thumbnail}`}
                alt={`logo`}
              />
            </div>
            <div className="col-lg-6 col-xl-6 col-mg-g col-sm-12 right">
              <h1 id={`judul${data.id}`}>
                {data.judul
                  ? data.judul.length < 70
                    ? data.judul
                    : data.judul.substring(0, 70) + "..."
                  : ""}
                <Tooltip
                  anchorId={`judul${data.id}`}
                  content={`${data.judul}`}
                  place="top"
                  style={{
                    zIndex: 2000,
                    backgroundColor: "#686868",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "17px",
                  }}
                />
              </h1>
              <h3 id={`deskripsi${data.id}`}>
                {data.deskripsi
                  ? data.deskripsi.length < 70
                    ? data.deskripsi
                    : data.deskripsi.substring(0, 70) + "..."
                  : ""}
                <Tooltip
                  anchorId={`deskripsi${data.id}`}
                  content={`${data.deskripsi}`}
                  place="top"
                  style={{
                    zIndex: 2000,
                    backgroundColor: "#686868",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "17px",
                  }}
                />
              </h3>
              <div
                style={{
                  margin: "10px 0",
                }}
              >
                {data.techstack_no_sanitation &&
                  splitTechstack(data.techstack_no_sanitation).map(
                    (t, index) => {
                      return (
                        <span
                          className="badge rounded-pill bg-primary me-1 mb-1"
                          key={index}
                        >
                          {t}
                        </span>
                      );
                    }
                  )}
              </div>
              <p className="author">
                Penulis: {data.name}
                <br />
                Dibuat: {data.dibuat}
                <br />
                Diperbaharui: {data.diperbaharui}
              </p>
              <p className="author"></p>
            </div>
          </div>
          <div
            className="row"
            style={{
              margin: "100px 0",
            }}
          >
            <div className="col">
              <div
                contentEditable="false"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
          </div>
        </div>
      </section>
    </Div>
  );
}

const Div = styled.div`
  .detail-header {
    padding: 70px 0;
  }
  .left img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
  }
  .right h1 {
    font-size: 25px;
    font-weight: 600 !important;
  }
  .right h3 {
    font-size: 18px;
  }
  .right p {
    font-size: 14px;
  }
  .author {
    font-size: 12px !important;
    color: #64748b;
    font-weight: 500;
  }

  .badge.bg-primary {
    background-color: #5356fb !important;
    font-weight: 400;
    font-size: 12px;
  }

  /* ck editor */
  figure.table td {
    border: 1px solid #b3b3b3 !important;
    padding: 5px !important;
  }
  hr {
    border: 2px solid #acacac !important;
    margin: 30px auto !important;
  }

  @media (min-width: 768px) {
    .right h1 {
      font-size: 40px;
    }
    .right h3 {
      font-size: 25px;
    }
    .right p {
      font-size: 18px;
    }
  }
`;
