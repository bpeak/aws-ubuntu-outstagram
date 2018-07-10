import React, { Component, Fragment } from 'react';

//components
import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'
import PassportHeader from '~components/PassportHeader/PassportHeader.js'

//imgs
import logoImg from '~img/post/testLogo2.png'
import MarkYesImg from '~img/Mark/yes.svg'
import MarkNoImg from '~img/Mark/no.svg'

//scss
import './SocialLogin.scss'

import * as actions from '~redux/actions/'
import store from '~redux/reducers/store.js'

class SocialLogin extends Component {
    constructor(){
        super()
        this.state = {
            isFetching : false,
            user : undefined,
            user_input_nick : '',
            isAvailable : false,
            inputValue : ''
        }
    }

    _abortController = null

    componentDidMount(){
        fetch('/auth/login/kakao/info', {
            method : "GET",
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            console.log(response.user)
            this.setState({
                ...this.state,
                user : response.user
            })
        })
    }

    _handleOnNickInputChange = (e) => {
        console.log(e.target.value)
    }

    _handleOnInputChange = (e) => {
        if(e.target.value === this.state.inputValue){
            return true
        }
        if(this._abortController === null){
            this._abortController = new AbortController()
        } else {
            this._abortController.abort()
            this._abortController = new AbortController()           
        }
        const nick = e.target.value
        this.setState({
            ...this.state,
            isAvailable : false,
            isFetching : true
        }, () => {
            fetch(`/auth/check/nick/${nick}`, {
                method: 'GET',
                credentials: "same-origin",
                signal : this._abortController.signal
            })
            .then(data => data.json())
            .then(json => JSON.parse(json))
            .then(response => {
                if(response.isAvailable === true){
                    this.setState({
                        ...this.state,
                        inputValue : nick,
                        isFetching : false,
                        isAvailable : true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        isFetching : false,
                        inputValue : nick,
                        isAvailable : false
                    })
                }
            })
            .catch(err => {console.log(err)})
        })

    }

    _handleOnBtnStartClick = () => {
        console.log(this.state.inputValue)
        const request = {
            nick : this.state.inputValue
        }
        fetch('/auth/login/kakao/new', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            credentials : 'same-origin',
            body : JSON.stringify(request) 
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            const { user } = response
            store.dispatch(actions.login_success(user.id, user.nick, user.name, user.profilePhotoUrl))
            window.location.href = '/'
        })
    }

    render() {
        return (
            <div className="socialLogin">
                <PassportHeader/>
                <main>
                    <section>
                        {this.state.user !== undefined 
                            ?
                            <Fragment>
                                <div className="__top">
                                    <div className="__left">
                                        <div className="socialLogin__profilePhoto-container">
                                            <ProfilePhoto url={this.state.user.profilePhotoUrl}/>
                                        </div>
                                        <span>{this.state.user.name}</span>
                                    </div>
                                    <div className="__right">
                                        <img className="__logo" src={logoImg}/>
                                    </div>
                                </div>
                                <div className="__bottom">
                                    <span>사용하실 닉네임을 정해주세요</span>
                                    <div className="__input-container">
                                        <input ref="dd" onChange={this._handleOnInputChange} type="text" placeholder="닉네임"/>
                                        {this.state.isFetching === false && 
                                            <img className="__mark" src={this.state.isAvailable === true ? MarkYesImg : MarkNoImg }/>
                                        }
                                    </div>
                                    <button onClick={this._handleOnBtnStartClick} disabled={this.state.isAvailable === true ? false : true }>시작하기</button>
                                </div>
                            </Fragment>
                            :
                            <div>데이터 가져오는중</div>
                        }
                    </section>
                </main>
            </div>
        );
    }
}

export default SocialLogin