import React from 'react'

import './PostNick.scss'

const PostNick = ({nick}) => {
    return (
        <span className="postNick">{nick}</span>
    )
}

export default PostNick