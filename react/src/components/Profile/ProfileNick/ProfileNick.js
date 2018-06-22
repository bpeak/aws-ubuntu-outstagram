import React from 'react'

import store from '../../../redux/reducers/store.js'

const ProfileNick = () => {
    return (
        <span>{store.getState().user.nick}</span>
    )
}

export default ProfileNick