import React, { Component } from 'react';

//components
import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

//store
import store from '~redux/reducers/store.js'

//scss
import './ProfileOtherHeader.scss'

class ProfileOtherHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFollow : this.props.user.followers.indexOf(store.getState().user.nick) === -1 ? false : true
        }
    }
    render() {
        return (
            <div className="ProfileOtherHeader">
                <div className="__left">
                    <div className="__profilePhoto-container">
                        <ProfilePhoto url={this.props.user.profilePhotoUrl}/>
                    </div>
                </div>
                <div className="__right">
                    <div className="__top">
                        <span className="__nick">{this.props.user.nick}</span>
                        <button 
                            className={this.state.isFollow === false ? '__btnUnFollow' : '__btnFollow'}
                        >
                            {this.state.isFollow === true ? '언팔로우' : '팔로우'}
                        </button>
                    </div>
                    <div className="__mid">
                        <div>
                            <span>게시물{this.props.user.posts.length}</span>
                            <span>팔로워{this.props.user.followers.length}</span>
                            <span>팔로잉{this.props.user.followings.length}</span>
                        </div>
                    </div>
                    <div className="__bottom">
                        <span>{this.props.user.name}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileOtherHeader;