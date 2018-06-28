import React from 'react';

//imgs
import flagImg from '~img/post/flag.png'
import savedFlagImg from '~img/post/savedFlag.png'

//scss
import './PostFlag.scss'

const PostFlag = ({handleOnClick, isSaved}) => {
    return (
        <img 
            onClick={handleOnClick} 
            className="postFlag" 
            src={isSaved === true ? savedFlagImg : flagImg}/>
    )
}

export default PostFlag