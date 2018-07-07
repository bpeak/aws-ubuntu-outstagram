import React, { Component } from 'react';

import Modal from '~components/Modal/Modal.js'

// import PostProfilePhoto from '~components/Post/PostProfilePhoto/PostProfilePhoto.js'
// import PostNick from '~components/Post/PostNick/PostNick.js'
// import PostContent from '~components/Post/PostContent/PostContent.js'

// import PostLike from '~components/Post/PostLike/PostLike.js'
// import PostBallon from '~components/Post/PostBalloon/PostBalloon.js'
// import PostFlag from '~components/Post/PostFlag/PostFlag.js'
// import PostLikesCount from '~components/Post/PostLikesCount/PostLikesCount.js'

import Post from '~components/Post/Post.js'

//scss
import './PostModal.scss'

class PostModal extends Component {
    constructor(){
        super()
    }

    _handleOnModalWrapperClick = (e) => {
        if(e.target.className === "postModal-wrapper"){
            console.log(123)
            this.props.handleOnClose()
        } else {
            //done
        }
    }

    render() {
        const {
            post
        } = this.props
        return (
            <Modal>
                <div onClick={this._handleOnModalWrapperClick} className="postModal-wrapper">
                    <div className="postModal">
                        <Post
                            _id={post._id}
                            nick={post.nick}
                            profilePhotoUrl={post.profilePhotoUrl}
                            contents={post.contents}
                            description={post.description}
                            likes={post.likes}
                            flags={post.flags}
                            comments={post.comments}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default PostModal;