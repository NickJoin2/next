import React from 'react';
import styled from "styled-components";

const NoRecords = ({title}:{title: string}) => {

    const Empty = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        
        font-size: clamp(1.25rem, 0.897rem + 1.76vw, 2.188rem);
        font-weight: 700;
        text-align: center;
        
        color: #1E1E1E;
        min-height: 50vh;
    `

    return (
        <Empty>{title}</Empty>
    );
};

export default NoRecords;