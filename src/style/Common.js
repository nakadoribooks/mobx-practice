import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ListContents, ListItemWrapper, ListItemRow, ListItemLink, ListLikeImage} from './_ListStyle';
import {ContentsWrapper, ContentsInner, Title, FakeTitle, LikeImage, LikeButton} from './_ContentsStyle';

// Thank you 
// https://codepen.io/nuconeco/pen/ZXJOGK
const _Loader = styled.div`
    position: relative;
    display: inline-block;
    margin: 0 12.5% 100px;
    width: 50px;
    height: 50px;
    border: 2px solid ${({color})=> { return color; }};
    border-radius: 50%;
    
    animation: spin 0.75s infinite linear;

    border-top-color: transparent;

    &:before, &:after{
        left: -2px;
        top: -2px;
        display: none;
        position: absolute;
        content: '';
        width: inherit;
        height: inherit;
        border: inherit;
        border-radius: inherit;
    }

    &:after{
        display: block;
        left: -2px;
        top: -2px;
        border: inherit;
        transform: rotate(65deg);
    }

    @keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
`;

const Loader = ({color}) => {
    return (
        <div style={{textAlign:'center', marginTop:20}}>
            <_Loader color={color} />
        </div>
    );
};
Loader.propTypes = {
    color: PropTypes.string
};

export {
    Loader
    , ListContents, ListItemWrapper, ListItemRow, ListItemLink, ListLikeImage
    , ContentsWrapper, ContentsInner, Title, FakeTitle, LikeImage, LikeButton
};
