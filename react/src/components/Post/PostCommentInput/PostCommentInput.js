import React from 'react';

const PostForm = ({handler}) => {
    return (
        <input
            onKeyPress={handler}
            type="text"
            placeholder="댓글 달기..."
        />
    )
}

export default PostForm