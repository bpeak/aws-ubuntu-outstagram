import React from 'react';

//scss
import './PostFlag.scss'

//imgs
import flagImg from '~img/post/flag3.png'

const PostFlag = () => {
    return (
        <img className="postFlag" src={flagImg}/>
    )
}

export default PostFlag