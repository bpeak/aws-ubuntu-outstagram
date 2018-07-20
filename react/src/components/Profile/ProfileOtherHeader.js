import React, { Component } from 'react';

//components
import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'
import SmallLoadingSpinner from '~components/LoadingSpinner/SmallLoadingSpinner.js'
//store
import store from '~redux/reducers/store.js'

//scss
import './ProfileOtherHeader.scss'

class ProfileOtherHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFollow : this.props.user.followers.indexOf(store.getState().user.nick) === -1 ? false : true,
            isFetching : false
        }
    }

    _handleOnBtnFollowClick = () => {
        this.setState({
            ...this.state,
            isFetching : true
        }, () => {
            if(this.state.isFollow){
                //현재 팔로우중 => 언팔
                const request = {
                    unFollowNick : this.props.user.nick
                }
                fetch('/api/users/remove/follow', {
                    method : "POST",
                    headers : {
                        'content-type' : 'application/json'
                    },
                    credentials: "same-origin",
                    body : JSON.stringify(request)
                })
                .then(data => data.json())
                .then(json => JSON.parse(json))
                .then(response => {
                    if(response.isSuccess === true){
                        this.setState({
                            ...this.state,
                            isFollow : false,
                            isFetching : false
                        })
                    }
                })
            } else {
                //현지 미팔로우중 => 팔로우
                const request = {
                    followNick : this.props.user.nick
                }
                fetch('/api/users/add/follow', {
                    method : "POST",
                    headers : {
                        'content-type' : 'application/json'
                    },
                    credentials: "same-origin",
                    body : JSON.stringify(request)
                })
                .then(data => data.json())
                .then(json => JSON.parse(json))
                .then(response => {
                    if(response.isSuccess === true){
                        this.setState({
                            ...this.state,
                            isFollow : true,
                            isFetching : false
                        })
                    }
                })
            }        
        })
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
                            disabled={this.state.isFetching ? true : false }
                            onClick={this._handleOnBtnFollowClick}
                            className={this.state.isFollow === false ? '__btnUnFollow' : '__btnFollow'}
                        >
                            {this.state.isFollow === true ? '언팔로우' : '팔로우'}
                        </button>
                        {this.state.isFetching &&
                            <div className="__SmallLoadingSpinner-container">
                                <SmallLoadingSpinner/>
                            </div>                      
                        }
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