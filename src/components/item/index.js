import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {
    Loader
    , ListContents, ListItemWrapper, ListItemRow, ListItemLink, ListLikeImage
    , ContentsWrapper, ContentsInner, Title, FakeTitle, LikeButton} from '../../style/Common';

@inject('itemStore')
@observer
class Contents extends React.Component {
    
    componentDidUpdate() {
        window.scroll(0, 0);
    }

    onClickLike(){
        const item = this.props.itemStore.selectedItem;
        if(item.isLiked){
            item.unLike();
        }else{
            item.like();
        }
    }

    render() {

        const item = this.props.itemStore.selectedItem;

        if(item == null){
            return(
                <ContentsWrapper>
                    <Title>Qiita reader</Title>
                </ContentsWrapper>
            );
        }
        
        return (
            <ContentsWrapper>
                <Title>
                    {item.data.title}
                    <LikeButton 
                        onClick={this.onClickLike.bind(this)} 
                        isLiked={item.isLiked} />
                </Title>
                <ContentsInner>
                    <FakeTitle>{item.data.title}</FakeTitle>
                    <div dangerouslySetInnerHTML={{__html:item.data.rendered_body}} />
                </ContentsInner>
            </ContentsWrapper>
        );
    }
}

Contents.propTypes = {
    itemStore: PropTypes.object
    , match: PropTypes.object
};


/**
 * List
 */

@inject('itemStore')
@observer
class List extends React.Component {

    render() {

        const itemList = this.props.itemStore.itemList;
        const selectedItem = this.props.itemStore.selectedItem;

        if(itemList.length == 0){
            return (
                <ListContents>
                    <ListItemWrapper>
                        <Loader color="#fff" />
                    </ListItemWrapper>
                </ListContents>
            );
        }

        return (
            <ListContents>
                <ListItemWrapper>
                    {itemList.map((item) => {
                        return (
                            <ListItemRow key={item.data.id}>
                                <ListItemLink to={`/item/${item.data.id}`} 
                                    selecteditem={selectedItem} 
                                    item={item}>
                                    <ListLikeImage isLiked={item.isLiked} />
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
 * ItemComponent
 * メイン
 */

@inject('itemStore')
@observer
class ItemComponent extends React.Component {
    
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.itemStore.fetchIfneeded();
    }

    componentWillReceiveProps(nextProps){
        const id = nextProps.match.params.id;
        this.props.itemStore.select(id);
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

ItemComponent.propTypes = {
    location: PropTypes.object
    , match: PropTypes.object
    , itemStore: PropTypes.object
};

export default ItemComponent;