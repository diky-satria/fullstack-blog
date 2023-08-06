import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function HeaderHome() {
  return (
    <Div>
      {/* header */}
      <section className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8 col-md-8 col-sm-12 content">
              <h1>Tingkatkan kemampuan mu</h1>
              <h3>dengan tips dan trik mudah</h3>
              <p>
                Tingkatkan kemampuan mu dengan tips dan trik disini, ada
                beberapa teknologi yang digunakan seperti{" "}
                <span>Node JS, React JS, Express JS, MYSQL, Bootstrap</span> dan
                lain-lain.
              </p>
              <NavLink
                to="/topic"
                className="btn btn-lg btn-primary c-btn-client"
              >
                Pilih Topik disini {`>>>`}
              </NavLink>
            </div>
            <div className="col-lg-4 col-xl-4 col-md-4 col-sm-12"></div>
          </div>
        </div>
      </section>
      {/* end header */}
    </Div>
  );
}

const Div = styled.div`
  /* header */
  .header {
    margin-top: 70px;
    padding: 100px 0;
  }
  .header .content {
    text-align: center;
  }
  .header h1 {
    font-size: 25px;
    font-weight: bold;
  }
  .header h3 {
    font-size: 18px;
    font-weight: bold;
    color: #5356fb;
  }
  .header p {
    font-size: 14px;
    margin: 20px 0;
    color: #64748b;
  }
  .header p span {
    font-size: 14px;
    color: #5356fb;
    font-weight: bold;
  }
  .c-btn-client {
    background-color: #5356fb !important;
    color: white !important;
    border-radius: 15px !important;
    font-size: 14px !important;
  }
  /* end header */

  /* responsive */
  @media (min-width: 768px) {
    /* header */
    .header .content {
      text-align: left;
    }
    .header h1 {
      font-size: 50px;
    }
    .header h3 {
      font-size: 25px;
    }
    .header p {
      font-size: 18px;
    }
    .header p span {
      font-size: 18px;
    }
    .c-btn-client {
      font-size: 18px !important;
    }
    /* end header */
  }
`;
