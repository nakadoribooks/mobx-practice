import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentsWrapper = styled.div`
padding-left:400px;
    `;

const ContentsInner = styled.div`
    padding:20px;
    min-height:calc(100vh);
    `;

const Title = styled.h2`
    font-size:20px;
    padding:15px;
    color: #2ecc71;
    background: rgba(255, 255, 255, 0.9);
    margin:0px;
    position:fixed;
    padding-right:70px;
    width:calc(100vw - 477px);
    `;

// タイトル文字列に応じて上のpadding分
const FakeTitle = styled(Title)`
    visibility: hidden;
    position: relative;
    padding:0px;
    margin:0px;
`;

const _LikeImage = styled.svg`
    fill: ${({isLiked}) => isLiked ? '#ffffff' : '#2ecc71' };
    transition: fill 200ms ease;
`;

const _LikeButton = styled.div`
    position:absolute;
    width:24px; height:24px;
    right:20px; top:10px;
    border:1px solid #2ecc71;
    border-radius: 50%;
    padding:8px 2px 2px 8px;
    cursor: pointer;
    transition: background 200ms ease;
    background:${({isLiked}) => isLiked ? '#2ecc71' : 'transparent' };
    &:hover{
        border-color:transparent;
        background:${({isLiked}) => isLiked ? '#e74c3c' : '#2ecc71' };
        & > ${_LikeImage}{
            fill: #ffffff;
        }
    }
    `;

const LikeButton = ({onClick, isLiked}) =>{
    return (
        <_LikeButton onClick={onClick} isLiked={isLiked}>
            <_LikeImage isLiked={isLiked} fill="#FFFFFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
            </_LikeImage>
        </_LikeButton>
    );
};
LikeButton.propTypes = {
    onClick: PropTypes.func
    , isLiked: PropTypes.bool
};

export {
    ContentsWrapper
    , ContentsInner
    , Title
    , FakeTitle
    , LikeButton
};