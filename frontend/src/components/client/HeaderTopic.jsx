import React from "react";
import styled from "styled-components";

export default function HeaderTopic() {
  return (
    <Div>
      {/* header */}
      <section className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8 col-md-8 col-sm-12 content">
              <h1>Topik menarik yang kamu cari ada disini</h1>
              <p>
                Pilih topik pemrograman berbasis web disini. Ada beberapa studi
                kasus yang tersedia yang dapat memberikan{" "}
                <span>pengetahuan baru untuk mu.</span>
              </p>
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
