import React, { Component } from 'react'

//scss
import './ProfileUserBoardAndFollow.scss'

class ProfileUserBoradAndFollow extends Component {
    render(){
        const {
            followers,
            followings,
            postsCount,
        } = this.props        
        return(
            <div className="profileUserBoradAndFollow">
                <span>게시물{postsCount}</span>
                <span>팔로워{followers.length}</span>
                <span>팔로잉{followings.length}</span>
            </div>
        )
    }
}

export default ProfileUserBoradAndFollow