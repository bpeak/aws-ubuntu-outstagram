import React from 'react';

import balloonImg from '../../../img/post/balloon.png'

import './PostBalloon.scss'

const PostBalloon = () => {
    return (
        <img onClick={() => {console.log(123)}} className="postBalloon" src={balloonImg}/>
    )
}

export default PostBalloon