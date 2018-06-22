import React, { Component } from 'react';

import likeImg from '../../../img/post/like.png'
import filledLikeImg from '../../../img/post/filledLike.png'

import './PostLike.scss'

const PostLike = ({like, handleOnLikeClick}) => {
    return (
        <img 
            onClick={handleOnLikeClick} 
            className="postLike"
            src={like === true ? filledLikeImg : likeImg}
        />
    )
}
export default PostLike