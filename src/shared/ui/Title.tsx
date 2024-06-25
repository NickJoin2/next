import React from 'react';
import styled from "styled-components";

const Title = ({title, position = 'center'}:{title: string, position?:string}) => {

    const Title = styled.h1`
        text-align: ${position};
        font-weight: 700;
        font-size: clamp(1.875rem, 1.64rem + 1.18vw, 2.5rem);
        color: #1e1e1e;
    `

    return <Title>{title}</Title>
};

export default Title;