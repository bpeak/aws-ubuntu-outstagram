import React from 'react';

//scss
import './PostCommentInput.scss'

const PostForm = ({handler}) => {
    return (
        <input 
            className="postCommentInput"
            onKeyPress={handler}
            type="text"
            placeholder="댓글 달기..."
        />
    )
}

export default PostForm