import React from "react";
import styled from "styled-components";

const OnaySayfası = (props) => {
  const Div = styled.div`
    background: #ce2829;
    background-size: cover;
  `;

  const H2 = styled.h2`
    color: white;
    text-align: center;
    font-family: "Chelsea Market", cursive;
    font-size: 30px;
    padding-top: 5%;
  `;

  const P = styled.p`
    color: white;
    text-align: center;
    font-family: "Barlow", sans-serif;
    font-size: 45px;
    padding-top: 15%;
    padding-bottom: 21%;
  `;

  return (
    <Div>
      <H2>Teknolojik Yemekler</H2>
      <P>
        TEBRİKLER!
        <br />
        SİPARİŞİNİZ ALINDI!
      </P>
    </Div>
  );
};

export default OnaySayfası;
