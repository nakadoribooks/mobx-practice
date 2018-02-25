import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListContents = styled.div`
    z-index:10;
    height:100vh;
    overflow:hidden;
    position:fixed;
    width:400px;
    background: #2ecc71;
`;
const ListItemWrapper = styled.div`
    overflow-y:auto;
    height:calc(100% - 50px);
    padding-top:50px;
`;

const ListItemRow = styled.div`
    border-bottom:1px solid #0eac51;
`;

const ListItemLink = styled(Link)`
    padding:10px 10px;
    display:block;
    text-decoration:none;
    color: #ffffff;
    &:hover{
        background: #ffffff;
        color: #333333;
    }
    ${ ({item, selecteditem})  => {

        return (selecteditem && item.data.id == selecteditem.data.id) ? `
        background: #ffffff;
        color: #2ecc71 !important;
        &:hover{
            background: #ffffff;
        }
        ` : '';
    }};
`;

const _ListLikeImage = styled.svg`
    transition: fill 200ms ease;
    display: ${({isLiked}) => (isLiked) ? 'block' : 'none'};
    float:right;
    padding-left:10px;
`;
const ListLikeImage = ({isLiked}) => {
    return (
        <_ListLikeImage isLiked={isLiked} fill="#f1c40f" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </_ListLikeImage>
    );
};
ListLikeImage.propTypes = {
    isLiked: PropTypes.bool
};


export {ListContents, ListItemWrapper, ListItemRow, ListItemLink, ListLikeImage};