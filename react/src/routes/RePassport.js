import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import store from '~redux/reducers/store.js'
import * as actions from '~redux/actions/index.js'

class RePassport extends Component {
    constructor(){
        super()
        this.state = {
            isClearPassportData : false
        }
    }

    componentDidMount(){
        store.dispatch(actions.logout_success())
        fetch('/auth/logout', {
            method : "GET",
            credentials : 'same-origin'
        })
        .then(() => {
            this.setState({
                ...this.state,
                isClearPassportData : true
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.isClearPassportData === true ? <Redirect to="/"/> : <div>loading...</div>}
            </div>
        );
    }
}

export default RePassport;