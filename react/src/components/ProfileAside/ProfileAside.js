import React, { Component, Fragment } from 'react'

import ProfilePhoto from '../Profile/ProfilePhoto/ProfilePhoto.js'
import ProfileNick from '../Profile/ProfileNick/ProfileNick.js'
import ProfileName from '../Profile/ProfileName/ProfileName.js'

import { Link } from 'react-router-dom'

import './ProfileAside.scss'

import store from '~redux/reducers/store.js'

class ProfileAside extends Component{
    constructor(){
        super()
        this.state = {
            profilePhotoUrl : store.getState().user.profilePhotoUrl
        }
        this.unSubscribe = store.subscribe(() => {
            console.log('사진바뀜')
            this.setState({
                ...this.state,
                profilePhotoUrl : store.getState().user.profilePhotoUrl
            })
        })
    }

    render(){
        return (
            <div className="profileAside">
                <Link to={`/profile/${store.getState().user.nick}`} id="profileAside-userSet">
                    <span id="profilePhoto-container">
                        <ProfilePhoto url={this.state.profilePhotoUrl}/>
                    </span>
                    <div id="profileAside-userSet-stringSet">
                    <ProfileNick/>
                    <ProfileName/>
                    </div>
                </Link>
                <div id="profileAside_story">
                    스토리
                </div>
                <div>
                    회원님이 팔로우하는 사람들의 스토리가 여기에 표시됩니다.
                </div>
                <div id="profileAside_nav">
                    <nav>
                        <ul>
                            <li><Link className="__link" to='/devinfo'>개발자정보</Link></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <span>© 2018 OUTSTAGRAM</span>
                </div>
            </div>
        )
    }
}

export default ProfileAside