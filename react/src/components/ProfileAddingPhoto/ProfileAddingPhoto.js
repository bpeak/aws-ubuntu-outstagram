import React, { Component } from 'react'

import IconProfileAdding from '../../img/post/profileAdding.png'

import * as actions from '~redux/actions/index.js'
import store from '~redux/reducers/store.js'

import getFileType from '~modules/getFileType.js'

import './ProfileAddingPhoto.scss'

class ProfileAddingPhoto extends Component {
    constructor(){
        super()
        this.state = {
            fileName : ''
        }
    }

    _handleOnButtonClick = () => {
        this.refs.hidden_button.click();
    }

    _handleOnInputChange = (e) => {
        if(getFileType(e.target.files[0].name) === 'img'){
            //done
        } else {
            return alert('파일 형식이 맞지 않습니다.')
        }
        if(e.target.files.length === 1){
            const form = new FormData()
            form.append('profilePhoto', e.target.files[0])
            fetch('/api/profile/photo', {
                method: 'POST',
                credentials: "same-origin",
                body : form
            })
           .then(data => data.json())
           .then(json => JSON.parse(json))
           .then(response => {
                if(response.redirect === true){
                   alert('세션이 만료되었습니다.')
                   window.location.href = "/RePassport"
                } else {
                    store.dispatch(actions.profile_add_photo(response.profilePhotoUrl))
                    window.location.reload()
                }
            })
        }
    }

    render(){
        return(
            <div className="profileAddingPhoto">
                <img src={IconProfileAdding}/>
                <div id="mainMsg">프로필 사진 추가</div>
                <div id="subMsg">친구들이 회원님을 알아볼 수 있도록 프로필 사진을 추가하세요.</div>
                <button ref="visible_button" onClick={this._handleOnButtonClick}>프로필 사진 추가</button>
                <div id="inputFile"><input ref="hidden_button" onChange={this._handleOnInputChange} type="file"/></div>
            </div>
        )
    }
}

export default ProfileAddingPhoto