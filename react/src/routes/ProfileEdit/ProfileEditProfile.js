import React, { Component } from 'react';

import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

import path from 'path'

import * as actions from '~redux/actions/'
import store from '~redux/reducers/store.js'

import './ProfileEditProfile.scss'

class ProfileEditProfile extends Component {
    constructor(){
        super()
        this.state = {
            nick : store.getState().user.nick,
            name : store.getState().user.name,
            profilePhotoUrl : store.getState().user.profilePhotoUrl,
            isChanged : false,
            file : undefined
        }
    }

    _handleOnNameChange = (e) => {
        this.setState({
            ...this.state,
            name : e.target.value,
            isChanged : true
        })
    }

    _handleOnNickChange = (e) => {
        this.setState({
            ...this.state,
            nick : e.target.value,
            isChanged : true
        })
    }

    _editProfilePhotoClick = () => {
        this.refs.fileInput.click()
    }

    _handleOnInputFileChange = (e) => {
        const file = e.target.files[0]
        const extname = path.extname(file.name)
        console.log(extname)
        if(
            extname == ".jpeg" ||
            extname == ".jpg" ||
            extname == ".png" ||
            extname == ".svg" 
        ){
            const reader = new FileReader()        
            reader.onloadend = () => {
                this.setState({
                    ...this.state,
                    file,
                    profilePhotoUrl : reader.result
                })
            }
            reader.readAsDataURL(file)
            const form = new FormData()
            form.append('profilePhoto', file)
            fetch('/api/profile/photo', {
                method : "POST",
                credentials: "same-origin",
                body : form
            })
            .then(data => data.json())
            .then(json => JSON.parse(json))
            .then((response) => {
                store.dispatch(actions.profile_add_photo(response.profilePhotoUrl))
                window.location.reload()
            })
        } else {
            alert('지원하지 않는 파일형식입니다.')
        }
    }
    
    _handleOnBtnSubmitClick = () => {
        const request = {
            nick : this.state.nick,
            name : this.state.name
        }
        fetch('/api/profile/edit', {
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
                console.log(response.name)
                store.dispatch(actions.profile_change_name(response.name))
                alert('프로필이 저장되었습니다.')
            }
        })
    }

    render() {
        return (
            <div className="ProfileEditProfile">
                <div className="__row">
                    <div className="__leftSide">
                        <div onClick={this._editProfilePhotoClick} className="__profilePhoto-container">
                            <ProfilePhoto url={this.state.profilePhotoUrl}/>
                        </div>
                        <input onChange={this._handleOnInputFileChange} ref="fileInput" className="__file" type="file"/>
                    </div>
                    <div className="__rightSide">
                        <div className="__photoSet">
                            <span>{this.state.nick}</span>
                            <span onClick={this._editProfilePhotoClick}>프로필 사진 수정</span>
                        </div>
                    </div>
                </div>
                <div className="__row">
                    <div className="__leftSide">
                        <span>이름</span>
                    </div>
                    <div className="__rightSide">
                        <input onChange={this._handleOnNameChange} value={this.state.name}/>
                    </div>
                </div>
                <div className="__row">
                    <div className="__leftSide"></div>
                    <div className="__rightSide">
                        <button onClick={this._handleOnBtnSubmitClick} disabled={this.state.isChanged === true ? false : true } className="__btnSubmit">제출</button>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default ProfileEditProfile;