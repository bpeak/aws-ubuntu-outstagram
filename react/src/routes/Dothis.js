import React, { Component } from 'react';

import store from '~redux/reducers/store'
import * as actions from '~redux/actions/'

class Dothis extends Component {
    componentDidMount(){
        fetch('/auth/login/kakao/dothis', {
            method : "GET",
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            store.dispatch(actions.login_success(response.id, response.nick, response.name, response.profilePhotoUrl))
            window.location.href = "/"
        })
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Dothis;