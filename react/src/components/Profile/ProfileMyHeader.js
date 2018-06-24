import React, { Component } from 'react'

//components
import ProfilePhoto from './ProfilePhoto/ProfilePhoto.js'
import ProfileNickTemp from './ProfileNickTemp/ProfileNickTemp.js'
import ProfileEditBtn from './ProfileEditBtn/ProfileEditBtn.js'
import ProfileSettingIcon from './ProfileSettingIcon/ProfileSettingIcon.js'
import ProfileUserBoradAndFollow from './ProfileUserBoradAndFollow/ProfileUserBoradAndFollow.js'
import ProfileNameTemp from './ProfileNameTemp/ProfileNameTemp.js'
//scss
import './ProfileMyHeader.scss'

class ProfileMyHeader extends Component {
    render(){
        const {
            nick,
            name,
            profilePhotoUrl,
            followers,
            followings,
            postsCount
        } = this.props
        return(
            <div className="profileMyHeader">
                <div className="__left">
                    <div className="__profilePhoto-container">
                        <ProfilePhoto url={profilePhotoUrl}/>
                    </div>
                </div>
                <div className="__right">
                    <div className="__top">
                        <div className="__content"><ProfileNickTemp nick={nick}/></div>
                        <div className="__content"><ProfileEditBtn/></div>
                        <div className="__content"><ProfileSettingIcon/></div>
                    </div>
                    <div className="__mid">
                        <ProfileUserBoradAndFollow
                            followers={followers}
                            followings={followings}
                            postsCount={postsCount}
                        />
                    </div>
                    <div className="__bottom">
                        <ProfileNameTemp name={name}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileMyHeader