import React from 'react';

//components
import SmallLoadingSpinner from '~components/LoadingSpinner/SmallLoadingSpinner.js'

//scss
import './PostCommentInput.scss'

const PostCommentInput = ({handler, isFetching}) => {
    return (
        <div className="postCommentInput">
            <input 
            onKeyPress={handler}
            type="text"
            placeholder="댓글 달기..."
            />
            {isFetching === true &&
                <div className="loadingSpinner-container">
                    <SmallLoadingSpinner/>
                </div>
            }
        </div>
    )
}

export default PostCommentInput