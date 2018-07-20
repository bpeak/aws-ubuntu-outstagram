import React, { Component } from 'react';

import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

import store from '~redux/reducers/store.js'

import SmallLoadingSpinner from '~components/LoadingSpinner/SmallLoadingSpinner.js'

import './ProfileEditPw.scss'

class ProfileEditPw extends Component {
    constructor(){
        super()
        this.state = {
            pw : '',
            pw_new: '',
            pw_new_check: '',
            isFetching : false,
            available : false
        }
    }


    _handleOnChange = (e) => {
        const value = e.target.value
        let key
        switch(e.target.id){
            case 'pw_pw':
                key = 'pw'
                break
            case 'pw_pw_new':
                key = 'pw_new'
                break
            case 'pw_pw_new_check':
                key = 'pw_new_check'
                break
        }
        this.setState({
            ...this.state,
            [ key ] : value
        }, () => {
            let available
            if(this.state.pw !== '' && this.state.pw_new !== '' && this.state.pw_new_check !== ''){
                available = true
            } else {
                available = false
            }
            this.setState({
                ...this.state,
                available
            })
        })
    }

    _handleOnBtnSubmitClick = () => {
        const { pw, pw_new, pw_new_check } = this.state
        if(pw_new !== pw_new_check){ return alert("새 비밀번호가 일치하지 않습니다.")}
        if(pw_new.length < 6){ return alert("6자 이상의 비밀번호를 만드세요.")}
        this.setState({
            ...this.state,
            isFetching : true
        }, () => {
            const request = {
                pw,
                pw_new
            }
            fetch('/api/profile/changePw', {
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
                if(response.isSuccess === true){
                    alert('비밀번호가 변경되었습니다.')
                    this.setState({
                        ...this.state,
                        isFetching : false
                    })
                } else {
                    alert(response.errorMsg)
                    this.setState({
                        ...this.state,
                        isFetching : false
                    })                    
                }
            })
        })
    }

    render() {
        return (
            <div className="ProfileEditPw">
                <div className="__row">
                    <div className="__leftSide">
                        <div className="__profilePhoto-container">
                            <ProfilePhoto url={store.getState().user.profilePhotoUrl}/>
                        </div>
                    </div>
                    <div className="__rightSide">
                        <span className="__nick">{store.getState().user.nick}</span>
                    </div>
                </div>
                <div className="__row">
                    <div className="__leftSide">
                        <span>이전 비밀번호</span>
                    </div>
                    <div className="__rightSide">
                        <input id="pw_pw" onChange={this._handleOnChange} type="password"/>
                    </div>
                </div>
                <div className="__row">
                    <div className="__leftSide">
                        <span>새 비밀번호</span>
                    </div>
                    <div className="__rightSide">
                        <input id="pw_pw_new" onChange={this._handleOnChange} type="password"/>
                    </div>
                </div>
                <div className="__row">
                    <div className="__leftSide">
                        <span>새 비밀번호 확인</span>
                    </div>
                    <div className="__rightSide">
                        <input id="pw_pw_new_check" onChange={this._handleOnChange} type="password"/>
                    </div>
                </div>
                <div className="__row">
                    <div className="__leftSide">
                    </div>
                    <div className="__rightSide">
                        <div>
                            <button disabled={!this.state.available} onClick={this._handleOnBtnSubmitClick}>비밀번호 변경</button>
                        </div>
                        {this.state.isFetching === true 
                            && <div className="__loadingSpinner-container">
                                <SmallLoadingSpinner/>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEditPw;