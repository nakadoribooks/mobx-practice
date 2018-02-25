import {observable} from 'mobx';
import superagent from 'superagent';
import User from './entity/User';
import Config from '../Config';

class UserStore{
    
    _loadedUser = false
    _loadedFolower = false

    @observable user = null;
    @observable followerList = null;

    fetchUserIfneeded(){
        if(this._loadedUser){ return; }
        this._loadedUser = true;
        this._fetchUser();
    }
    _fetchUser(){
        superagent
            .get(`${Config.apiEndpint}/users/${Config.userId}`).set('Authorization', `Bearer ${Config.token}`)
            .end((error, res) => {
                if (res.status != 200) {
                    return;
                }
                const json = JSON.parse(res.text);
                const user = new User(json);
                this.user = user;
            });
    }

    fetchFollowerIfneeded(){
        if(this._loadedFolower){ return; }
        this._loadedFolower = true;
        this._fetchFollower();
    }
    _fetchFollower(){
        superagent
            .get(`${Config.apiEndpint}/users/${Config.userId}/followers`).set('Authorization', `Bearer ${Config.token}`)
            .end((error, res) => {
                if (res.status != 200) {
                    return;
                }

                const json = JSON.parse(res.text);
                let data = json.map((row)=>{return new User(row); });
                this.followerList = data;
            });
    }
}

export default UserStore;