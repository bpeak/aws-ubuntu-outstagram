import React, { Component } from 'react';

//components
import CompassPost from '~components/Compass/CompassPosts/CompassPost.js'

import Footer from '~components/Footer/Footer.js'

import boardCameraImg from '~img/boardCamera.png'

//scss
import './ProfileOtherContents.scss'

class ProfileOtherContents extends Component {
    render() {
        return (
            <div className="ProfileOtherContents">
                {this.props.posts.length === 0 
                    ? <div className="__nullMsg-container">
                        <div className="__nullSet">
                            <img src={boardCameraImg}/>
                            <span>게시물이 없습니다.</span>
                        </div>
                    </div> 
                    : <div>
                        {this.props.posts.map((post, index) => {
                            return (
                                <CompassPost
                                    key={index}
                                    post={post}
                                />
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default ProfileOtherContents;