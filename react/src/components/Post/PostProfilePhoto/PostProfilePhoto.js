import React from 'react'

import './PostProfilePhoto.scss'

const PostProfilePhoto = ({url}) => {
    return (
        <img className="postProfilePhoto" src={url}/>
    )
}

export default PostProfilePhoto