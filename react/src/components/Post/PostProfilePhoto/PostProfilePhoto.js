import React from 'react'

//imgs
import profilePhotoDefaultImg from '~img/profilePhotoDefault2.jpg'

//scss
import './PostProfilePhoto.scss'

const PostProfilePhoto = ({url}) => {
    return (
        <img className="postProfilePhoto" src={url}/>
    )
}

PostProfilePhoto.defaultProps = {
    url : profilePhotoDefaultImg
}

export default PostProfilePhoto