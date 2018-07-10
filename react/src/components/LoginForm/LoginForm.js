import React, { Component, Fragment } from 'react';

import logoImg from '../../img/post/testLogo2.png'

import ProfileNick from '~components/Profile/ProfileNick/ProfileNick.js'
import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

import './LoginForm.scss'

const getLoginHistory = () => {
	if(window.localStorage.outstagram){
		const outstagram = JSON.parse(window.localStorage.outstagram)
		if(outstagram.user){
			return outstagram.user
		} else {
			return false
		}
	} else {
		return false
	}
}

class LoginForm extends Component{
    constructor(){
        super()
        this.state = {
            user_input_id : '',
            user_input_pw : '',
            loginHistory : getLoginHistory(),
            historyLogin_input_pw : ''
        }
    }

    _handleOnIdChange = (e) => {
        this.setState({
            ...this.state,
            user_input_id : e.target.value
        });
    }
    _handleOnPwChange = (e) => {
        this.setState({
            ...this.state,
            user_input_pw : e.target.value
        })
    }
    
    _handleOnLoginSubmit = (e) => {
        e.preventDefault();
        if(this.state.user_input_id == '' || this.state.user_input_pw == ''){
            //미입력값 존재
        } else {
            //모든값 입력
            this.props.fetchLogin(this.state.user_input_id, this.state.user_input_pw)
        }
    }

    _handleOnBtnChangeAccountClick = () => {
        this.setState({
            ...this.state,
            loginHistory : false
        })
    }

    _handleOnHistoryLoginInputChange = (e) => {
        this.setState({
            ...this.state,
            historyLogin_input_pw : e.target.value
        })
    }

    _handleOnHistoryLoginClick = () => {
        if(this.state.historyLogin_input_pw !== ''){
            this.props.fetchLogin(this.state.loginHistory._id, this.state.historyLogin_input_pw)
        }
    }

    render(){
        const { isFetching, invertVia, errorMsg } = this.props
        return (
            <div id="loginForm-container">
                <img className="loginForm-logoImg" src={logoImg}/>
                {this.state.loginHistory === false
                    ?
                        <Fragment>
                            <form onSubmit={this._handleOnLoginSubmit}>
                                <input className="loginForm-input" onChange={this._handleOnIdChange} value={this.state.user_input_id} placeholder="아이디"/>
                                <input className="loginForm-input" onChange={this._handleOnPwChange} value={this.state.user_input_pw} placeholder="비밀번호" type="password"/>
                                <input disabled={isFetching === true || this.state.user_input_id === '' || this.state.user_input_pw === '' ? true : false } className="loginForm-btnSubmit" type="submit" value="로그인"/>
                            </form>
                            <span id="loginForm-span1">━━━━━━━ 또는 ━━━━━━━</span>
                            <a href="/auth/login/facebook" className="loginForm-span2">Facebook으로 로그인</a>
                            <a href="/auth/login/kakao" className="loginForm-span2">KakaoTalk로 로그인</a>
                            {errorMsg !== '' && <span id="loginForm-errorMsg">{errorMsg}</span>}
                            <span className="loginForm-span2">비밀번호를 잊으셧나요?</span>
                        </Fragment>
                    :
                        <Fragment>
                            <div id="loginForm-profilePhoto-container">
                                <ProfilePhoto url={this.state.loginHistory.profilePhotoUrl}/>
                                    <input onChange={this._handleOnHistoryLoginInputChange} className="loginForm-input" type="password" placeholder="비밀번호"/>
                                    <input onClick={this._handleOnHistoryLoginClick} disabled={isFetching === true || this.state.historyLogin_input_pw === '' ? true : false } className="loginForm-btnSubmit" type="submit" value={this.state.loginHistory.name + "님으로 계속"}/>
                                {errorMsg !== '' && <span id="loginForm-errorMsg">{errorMsg}</span>}
                                <div id="historyForm-span-container">
                                    <span>{this.state.loginHistory.name} 님이 아닌가요?</span>
                                    <span className="loginForm-span2" onClick={this._handleOnBtnChangeAccountClick}>계정 변경</span>
                                </div>
                            </div>
                        </Fragment>             
                }

            </div>
        )
    }
}

export default LoginForm