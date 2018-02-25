import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';
import { Route } from 'react-router-dom';
import {
    Loader
    , ListContents, ListItemWrapper, ListItemRow, ListItemLink
    , ContentsWrapper, ContentsInner, Title, FakeTitle
} from '../../style/Common';

/**
 * List
 */
@inject('itemStore')
@observer
class List extends React.Component {

    constructor(){
        super();

        var index = 1;
        const pathList = window.location.pathname.split('/');
        const lastPath = pathList[pathList.length-1];
        if(lastPath == 'followers'){
            index = 2;
        }
        
        this.state = {
            selectedIndex: index
        };
    }

    onClick(e){
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        this.setState({selectedIndex: index});
    }

    render() {

        const pages = [
            {title: '基本情報', index: 1, path: ''},
            {title: 'フォロワー', index: 2, path: 'followers'}
        ];

        return (
            <ListContents>
                <ListItemWrapper>
                    {pages.map((page) => {
                        return (
                            <ListItemRow 
                                key={page.path} 
                                onClick={this.onClick.bind(this)} 
                                data-index={page.index}>
                                <ListItemLinkEx to={`/mypage/${page.path}`} 
                                    index={page.index} 
                                    selectedindex={this.state.selectedIndex}>
                                    {page.title}
                                </ListItemLinkEx>
                            </ListItemRow>);
                    })}
                </ListItemWrapper>
            </ListContents>
        );
    }
}
List.propTypes = {
    itemStore: PropTypes.object
};

/**
 * 基本情報
 */
@inject('userStore')
@observer
class Home extends React.Component {
    
    componentDidMount(){
        this.props.userStore.fetchUserIfneeded();
    }

    render() {

        let user = this.props.userStore.user;
        
        if(!user){ return <LoadingView title="基本情報" />; }

        const {data} = user;
        return (
            <ContentsWrapper>
                <Title>基本情報</Title>
                <ContentsInner>
                    <FakeTitle>基本情報</FakeTitle>
                    <p>{data.name}</p>
                    <p>{data.location}</p>
                    <p>{data.description}</p>
                </ContentsInner>
            </ContentsWrapper>
        );
    }
}
Home.propTypes = {
    userStore: PropTypes.object
};

/**
 * フォロワー
 */
@inject('userStore')
@observer
class Followers extends React.Component {

    componentDidMount(){
        this.props.userStore.fetchFollowerIfneeded();
    }

    render() {

        const followerList = this.props.userStore.followerList;

        if(!followerList){ return <LoadingView title="フォロワー" />;}

        return (
            <ContentsWrapper>
                <Title>フォロワー</Title>
                <ContentsInner>
                    <FakeTitle>フォロワー</FakeTitle>
                    {followerList.map((user) => {
                        return (
                            <p key={user.data.id}>{user.data.id}</p>
                        );
                    })}
                </ContentsInner>
            </ContentsWrapper>
        );
    }
}
Followers.propTypes = {
    userStore: PropTypes.object
};

/**
 * main
 */
@inject('userStore')
@observer
class MypageComponent extends React.Component {
    
    constructor(){
        super();
    }
    
    render() {
        return (
            <div>
                <List />
                <div>
                    <Route exact path="/mypage" component={Home} />
                    <Route path="/mypage/followers" component={Followers} />
                </div>
            </div>
        );
    }
}
MypageComponent.propTypes = {
    location: PropTypes.object
    , match: PropTypes.object
    , userStore: PropTypes.object
};

export default MypageComponent;


/**
 * 以下、util
 */

const LoadingView = ({title}) => {
    return (
        <ContentsWrapper>
            <Title>{title}</Title>
            <ContentsInner>
                <FakeTitle>{title}</FakeTitle>
                <Loader color="#2ecc71" />
            </ContentsInner>
        </ContentsWrapper>
    );
};
LoadingView.propTypes = {
    title: PropTypes.string
};

const ListItemLinkEx = styled(ListItemLink)`
    ${ props => {
        const {index, selectedindex} = props;

        return (selectedindex == index) ? `
        background: #ffffff;
        color: #2ecc71 !important;
        &:hover{
            background: #ffffff;
        }
        ` : '';
    }};
`;