import React, { Component } from 'react';

import './FollowingRecommend.scss'

import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

import xImg from '~img/main/followingRecommend/x.png'

class FollowingRecommend extends Component {
    constructor(){
        super()
        this.state = {
            followingRecommendList : [
                {
                    profilePhotoUrl : undefined,
                    nick : "Sdfsdsfsdfsdff",
                    name : "김기현"
                },
                {
                    profilePhotoUrl : undefined,
                    nick : "Sdfzsf",
                    name : "김지형sdfsdf"
                },
                {
                    profilePhotoUrl : undefined,
                    nick : "Sdfsf",
                    name : "이동은"
                }
            ]
        }
    }
    render() {
        return (
            <div className="followingRecommend">
                <div className="top">
                    <div>회원님을 위한 추천</div>
                    <div>모두 보기</div>
                </div>
                <div className="main">
                    {this.state.followingRecommendList.map((user, index) => {
                        return (
                            <div className="user" key={index}>
                                <img className="xImg" src={xImg}/>
                                <div className="profilePhoto-container">
                                    <ProfilePhoto/>
                                </div>
                                <div className="userSet">
                                    <div className="nick">{user.nick}</div>
                                    <div className="name">{user.name}</div>                                    
                                </div>
                                <button className="btnFollow">팔로우</button>
                             </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default FollowingRecommend;