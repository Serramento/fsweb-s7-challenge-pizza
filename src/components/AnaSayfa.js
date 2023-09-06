import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const AnaSayfa = (props) => {

    const Div= styled.div`
        background-color: #CE2829;
    `

    const Button= styled.button`
        background: #FDC913;
        border-radius: 20px;
        width: 150px;
        height: 40px;
        border: none;
        display: block;
        margin: auto;
        font-family: 'Barlow', sans-serif;
        margin-bottom: 2%;
        

    `

    const H2 = styled.h2`
        color: white;
        text-align: center;
        font-family: 'Chelsea Market', cursive; 
        font-size: 30px;
        padding-top: 5%;
 
    `

    const P = styled.p`
        color: white;
        text-align: center;
        font-family: 'Barlow', sans-serif;
        font-size: 55px;
        padding-top: 1%;

    `

    const Img = styled.img`
        transform: rotate(180deg);
        display: block;
        margin: auto;
        
    `

    const history= useHistory();

    return(
        <Div className= "arkaplan">
            <H2>Teknolojik Yemekler</H2>
            <P>KOD ACIKTIRIR<br/>PIZZA, DOYURUR</P>
            <Button onClick= {() => history.push("/siparis")}>ACIKTIM</Button>
            <br/>
            <Img src= "assets/adv-form-banner.png" alt="image1"/>
        </Div>
    )
}

export default AnaSayfa;