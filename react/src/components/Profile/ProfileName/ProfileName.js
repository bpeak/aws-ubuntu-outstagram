import React from 'react'

import store from '../../../redux/reducers/store.js'

const ProfileName = () => {
    return (
        <span>{store.getState().user.name}</span>
    )
}

export default ProfileName