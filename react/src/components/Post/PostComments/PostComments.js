import React from 'react';

const PostComments = ({comments}) => {
    return (
        <div>
            {comments.map((comment, index) => {
                return (
                    <PostComment 
                        key={index}
                        comment={comment}
                    />
                )
            })}
        </div>
    )
}

const PostComment = ({comment}) => {
    return (
        <div>
            <span>{comment.nick}</span>
            <span>{comment.content}</span>
        </div>
    )
}

export default PostComments