import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuItem = styled(Link)`
    display:inline-block;
    width:133px;
    text-align:center;
    height:50px;
    line-height:50px;
    color:#333333;
    text-decoration:none;
    background:rgba(255, 255, 255, 0.9);
    &:last-child{
        width:134px;
    }
    &:hover{
        background: #ffffff;
    }
`;

const Menu = styled.div`
    width:400px;
    position:fixed;
    z-index:100;
    & > ${MenuItem}:nth-child(${({state}) => state.selectedIndex}){
        background: #2ecc71;
        color: #ffffff;
    }
`;

export { MenuItem, Menu };