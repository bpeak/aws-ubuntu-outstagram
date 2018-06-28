import React from 'react'

import './ProfilePhoto.scss'

import profilePhotoDefaultImg from '../../../img/profilePhotoDefault2.jpg'

const ProfilePhoto = (props) => {
    return (
        <img id="profilePhoto" src={props.url}/>
    )
}

ProfilePhoto.defaultProps = {
    url : profilePhotoDefaultImg
}

export default ProfilePhoto