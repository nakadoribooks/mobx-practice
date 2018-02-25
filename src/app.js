import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import {Item, Like, Mypage} from './components/';
import { Provider } from 'mobx-react';
import {ItemStore,UserStore} from './store';
import {Menu, MenuItem} from './style/Menu';

const stores = {
    itemStore: new ItemStore()
    , userStore: new UserStore()
};

class App extends React.Component {

    constructor(){
        super();
        const firstPath = window.location.pathname.split('/')[1];
        var index = 1;
        if(firstPath == 'item'){
            index = 1;
        }else if (firstPath == 'like'){
            index = 2;
        }else if (firstPath == 'mypage'){
            index = 3;
        }
        this.state = {
            selectedIndex: index
        };
    }

    onClickMenu(e){
        const menuIndex = e.target.getAttribute('data-index');
        this.setState({selectedIndex: menuIndex});
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Menu state={this.state}>
                        <MenuItem to="/item" onClick={this.onClickMenu.bind(this)} data-index={1}>New</MenuItem>
                        <MenuItem to="/like" onClick={this.onClickMenu.bind(this)} data-index={2}>Like</MenuItem>
                        <MenuItem to="/mypage" onClick={this.onClickMenu.bind(this)} data-index={3}>MyPage</MenuItem>
                    </Menu>
                    <Provider {...stores}>
                        <div>
                            <Route exact path="/" component={Item} />
                            <Route path="/item/:id?" component={Item} />
                            <Route path="/like/:id?" component={Like} />
                            <Route path="/mypage" component={Mypage} />
                        </div>
                    </Provider>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);