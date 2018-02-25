import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {
    ListContents, ListItemWrapper, ListItemRow, ListItemLink
    , ContentsWrapper, ContentsInner, Title, FakeTitle
} from '../../style/Common';

/**
 * List
 */
@inject('itemStore')
@observer
class List extends React.Component {

    render() {

        const itemList = this.props.itemStore.likedList;
        const selectedItem = this.props.itemStore.selectedItemLiked;

        return (
            <ListContents>
                <ListItemWrapper>
                    {itemList.map((item) => {
                        return (
                            <ListItemRow key={item.data.id}>
                                <ListItemLink 
                                    to={`/like/${item.data.id}`} 
                                    selecteditem={selectedItem} 
                                    item={item}>
                                    {item.data.title}
                                </ListItemLink>
                            </ListItemRow>
                        );
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
 * Contents
 */
@inject('itemStore')
@observer
class Contents extends React.Component {
    
    componentDidUpdate() {
        window.scroll(0, 0);
    }

    render() {

        const item = this.props.itemStore.selectedItemLiked;

        if(item == null){
            return (
                <ContentsWrapper>
                    <Title>ライクしやつ</Title>
                </ContentsWrapper>
            );
        }

        return (
            <ContentsWrapper>
                <div>
                    <Title>{item.data.title}</Title>
                    <ContentsInner>
                        <FakeTitle>{item.data.title}</FakeTitle>
                        <div dangerouslySetInnerHTML={{__html:item.data.rendered_body}} />
                    </ContentsInner>
                </div>
            </ContentsWrapper>
        );
    }
}
Contents.propTypes = {
    itemStore: PropTypes.object
    , match: PropTypes.object
};

/**
 * main
 */
@inject('itemStore')
@observer
class LikeComponent extends React.Component {
    
    constructor(){
        super();
    }

    componentWillReceiveProps(nextProps){
        const id = nextProps.match.params.id;
        this.props.itemStore.selectLiked(id);
    }
    
    render() {
        return (
            <div>
                <List />
                <Contents />
            </div>
        );
    }
}

LikeComponent.propTypes = {
    location: PropTypes.object
    , match: PropTypes.object
    , itemStore: PropTypes.object
};

export default LikeComponent;