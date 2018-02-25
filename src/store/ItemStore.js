import {observable, action, computed} from 'mobx';
import superagent from 'superagent';
import Item from './entity/Item';
import Config from '../Config';

class ItemStore{
    
    _loadedData = false

    @observable _data = null;
    @observable selectedItem = null
    @observable selectedItemLiked = null

    @computed get itemList() { return this._data || [];}
    @computed get likedList() {
        return this.itemList
            .filter( elem => { return elem.isLiked; })
            .sort((e1, e2)=>{ return e1.editedAt < e2.editedAt; });
    }

    @action select(itemId){
        this.selectedItem = this.find(itemId);
    }

    @action selectLiked(itemId){
        this.selectedItemLiked = this.find(itemId);
    }

    find(id) {
        if(id == null){ return null; }
        return this.itemList.find( item => { return (item.data.id == id); });
    }

    fetchIfneeded(){
        if(this._loadedData){ return; }
        this._loadedData = true;
        this._fetch();
    }
    _fetch(){
        superagent
            .get(`${Config.apiEndpint}/items`).set('Authorization', `Bearer ${Config.token}`)
            .end((error, res) => {
                if (res.status != 200) {
                    return;
                }
                const json = JSON.parse(res.text);
                const data = json.map((item) => { return new Item(item); });
                this._data = data;
            });
    }
}

export default ItemStore;