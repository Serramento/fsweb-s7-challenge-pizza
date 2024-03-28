import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

const AnaSayfa = () => {
  const Div = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ce2829;
    background-size: cover;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  `;

  const Button = styled.button`
    background: #fdc913;
    border-radius: 20px;
    width: 8vw;
    height: 5vh;
    border: none;
    font-family: "Barlow", sans-serif;
    font-weight: bold;
  `;

  const H2 = styled.h2`
    color: white;
    text-align: center;
    font-family: "Chelsea Market", cursive;
    font-size: 30px;
    padding-bottom: 5%;
    margin-top: 5%;
  `;

  const P = styled.p`
    color: white;
    text-align: center;
    font-family: "Barlow", sans-serif;
    font-size: 50px;
    margin-bottom: 1.5%;
  `;

  const Img = styled.img`
    transform: rotate(180deg);
    position: absolute;
    bottom: 0;
    width: 45%;
  `;

  return (
    <Div className="arkaplan">
      <H2>Teknolojik Yemekler</H2>
      <P>
        KOD ACIKTIRIR
        <br />
        PIZZA, DOYURUR
      </P>
      <Link to="/siparis">
        <Button>ACIKTIM</Button>
      </Link>
      <Img src="assets/adv-form-banner.png" alt="image1" />
    </Div>
  );
};

export default AnaSayfa;
