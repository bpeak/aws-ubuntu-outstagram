import React from 'react'

//scss
import './PostDescription.scss'

const PostDescription = ({nick, description}) => {
    return (
        <div>
            <span>{nick}</span>
            <span>{description}</span>
        </div>
    )
}

export default PostDescription