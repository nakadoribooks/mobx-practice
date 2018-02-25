import {observable, action} from 'mobx';

class Item{

    constructor(data){
        this.data = data;
    }

    editedAt = new Date()
    
    @observable isLiked = false
    
    @action like(){
        this.isLiked = true;
        this.editedAt = new Date();
    }

    @action unLike(){
        this.isLiked = false;
        this.editedAt = new Date();
    }

}

export default Item;