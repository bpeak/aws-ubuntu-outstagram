import React, { Component, Fragment } from 'react';

//로긴O
import Main from '../containers/Main/Main.js'
//로긴X
import Passport from '../containers/Passport/Passport.js'

import store from '../redux/reducers/store.js'
import * as actions from '../redux/actions/index.js'

class Home extends Component{
    constructor(){
        super();
        this.state = {
            isLoggedIn : store.getState().isLoggedIn
        }
        this.unSubscribe = store.subscribe(() => {
            this.setState({
                ...this.state,
                isLoggedIn : store.getState().isLoggedIn
            })
        })
    }

        //컴포넌트 윌 그거 햇을때 => 언섭스크라이브 실행 해줘야함 안그러면 계속 보고있어 명심해라 이글 지우지말고

    render(){
        return (
            <Fragment>
                {this.state.isLoggedIn === true
                    ? <Main/>
                    : <Passport/>
                }
            </Fragment>
        );
    }
}

export default Home;
