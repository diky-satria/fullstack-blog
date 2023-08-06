import React from "react";
import styled from "styled-components";
import Navbar from "../../components/client/Navbar";
import Footer from "../../components/client/Footer";

export default function LayoutClient({ children }) {
  return (
    <Div>
      <Navbar />

      {children}

      <Footer />
    </Div>
  );
}

const Div = styled.div`
  font-family: "Poppins", sans-serif;
  background-color: transparent !important;
  min-height: 100vh;
`;
