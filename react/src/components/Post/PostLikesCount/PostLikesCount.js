import React from 'react';

//scss
import './PostLikesCount.scss'

const PostLikesCount = ({count}) => {
    return (
        <div className="postLikesCount">좋아요 {count}개</div>
    )
}

export default PostLikesCount