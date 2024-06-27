import React from 'react';
import styled from "styled-components";


const Title = styled.p`
        font-weight: 800;
        font-size: 20px;
        color: #456B92;
    `

const Text = styled.span`
        font-weight: 500;
        color: #000;
    `

const SecondText = ({title, text}:{title: string, text: string}) => {
    return (
        <Title>{title}: <Text>{text}</Text></Title>
    );
};

export default SecondText;