import React, { Component } from 'react';

//components
import CompassPost from '~components/Compass/CompassPosts/CompassPost.js'

//scss
import './ProfileOtherContents.scss'

class ProfileOtherContents extends Component {
    render() {
        return (
            <div className="ProfileOtherContents">
                {false 
                    ? <div className="__nullMsg">게시물이 없습니다</div> 
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