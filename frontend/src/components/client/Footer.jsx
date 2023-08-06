import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Div>
      {/* footer */}
      <section className="footer">
        @ Copyright 2023{" "}
        <a href="https://dikysatria.net" target="_blank" rel="noreferrer">
          Diky satria ramadanu
        </a>
      </section>
      {/* end footer */}
    </Div>
  );
}

const Div = styled.div`
  /* footer */
  .footer {
    border-top: 1px solid #d9dfe7;
    text-align: center;
    padding: 40px;
  }
  .footer a {
    text-decoration: none;
    color: #5356fb;
    font-weight: bold;
  }
  /* end footer */
`;
