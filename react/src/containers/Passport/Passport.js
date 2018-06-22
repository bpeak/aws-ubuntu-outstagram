import React, { Component, Fragment } from 'react';

import './Passport.scss'

import PassportHeader from '../../components/PassportHeader/PassportHeader.js'

import SlideShow from '../../components/SlideShow/SlideShow.js'

import LoginForm from '../../components/LoginForm/LoginForm.js'
import JoinForm from '../../components/JoinForm/JoinForm.js'
import ChangeForm from '../../components/ChangeForm/ChangeForm.js'

import Footer from '../../components/Footer/Footer.js'

import * as actions from '../../redux/actions'
import store from '../../redux/reducers/store.js'

class Passport extends Component{
    constructor(){
        super()
        this.state = {
            isViaLogin : true,
            isFetching : false,
            errorMsgLogin : '',
            errorMsgJoin : ''
        }
    }
    
    _fetchStart = () => {
        this.setState({
            ...this.state,
            isFetching : true
        })
    }

    _fetchFinish = () => {
        this.setState({
            ...this.state,
            isFetching : false
        })
    }

    _fetchLogin = (user_input_id, user_input_pw) => {
        //fetching start
        this._fetchStart();
        const user = {
            user_input_id,
            user_input_pw
        }
        //fetching...
        fetch("auth/login", {
            method: 'POST',
            credentials: "same-origin",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            if(response.isSuccess === true){
                this._fetchFinish();
                store.dispatch(actions.login_success(response.user.id, response.user.nick, response.user.name, response.user.profilePhotoUrl))
            } else {
                this._fetchFinish();
                this.setState({
                    ...this.state,
                    errorMsgLogin : response.errorMsg
                })
            }
        })
    }

    _fetchJoin = (user_input_id, user_input_name, user_input_nick, user_input_pw) => {
        //fetching start
        this._fetchStart();
        const user = {
            user_input_id,
            user_input_name,
            user_input_nick,
            user_input_pw
        }
        //fetching...
        fetch("auth/join", {
            method: 'POST',
            credentials: "same-origin",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            if(response.isSuccess === true){
                this._fetchFinish();
                store.dispatch(actions.login_success(response.user.id, response.user.nick, response.user.name))
            } else {
                //여기서도 에러메시지 받을거야
                this._fetchFinish();
            }
        })
    }

    _fetchJoinCheckId = (user_input_id, callback) => {
        fetch("auth/join/id", {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({user_input_id})
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            callback(response)
        })
    }
    _fetchJoinCheckNick = (user_input_nick, callback) => {
        fetch("auth/join/nick", {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({user_input_nick})
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            callback(response)
        })
    }

    _invertVia = () => {
        this.setState({
            ...this.state,
            isViaLogin : !this.state.isViaLogin
        })
    }

    render(){
        return(
            <div>
                <header>
                    <PassportHeader/>
                </header>
                <div className="passport_container">
                    <section>
                        <SlideShow/>
                    </section>
                    <section id="passport-form">
                        <div className="passport-form-div">
                        {
                            this.state.isViaLogin === true
                            ?
                                <LoginForm
                                    isFetching={this.state.isFetching}
                                    fetchLogin={this._fetchLogin}
                                    errorMsg={this.state.errorMsgLogin}
                                />
                            :
                                <JoinForm
                                    isFetching={this.state.isFetching}
                                    fetchJoin={this._fetchJoin}
                                    fetchJoinCheckId={this._fetchJoinCheckId}
                                    fetchJoinCheckNick={this._fetchJoinCheckNick}
                                    errorMsg={this.state.errorMsgJoin}
                                />
                        }
                        </div>
                        <div className="passport-form-div">
                        <ChangeForm
                            invertVia={this._invertVia}
                            isViaLogin={this.state.isViaLogin}
                        />
                        </div>
                    </section>
                </div>
                <section>
                    <Footer/>
                </section>
            </div>
        )
    }
}

export default Passport