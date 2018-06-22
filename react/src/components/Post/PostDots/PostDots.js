import React from 'react';

import dotGrayImg from '~img/post/dotGray.png'
import dotSkyblueImg from '~img/post/dotSkyblue.png'

import './PostDots.scss'

const PostDots = ({selected}) => {
    return (
        <img className="postDots" src={selected === true ? dotSkyblueImg : dotGrayImg}/>
    )
}

export default PostDots