import React from 'react'

import { Link } from 'react-router-dom'

//scss
import './ProfileEditBtn.scss'

const ProfileEditBtn = () => {
    return (
        <Link to="/profileEdit" className="profileEditBtn">
            <button>프로필 편집</button>
        </Link>
    )
}

export default ProfileEditBtn