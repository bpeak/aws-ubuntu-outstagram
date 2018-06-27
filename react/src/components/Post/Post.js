import React, { Component, Fragment } from 'react'

//components
import PostProfilePhoto from './PostProfilePhoto/PostProfilePhoto.js'
import PostNick from './PostNick/PostNick.js'

import PostContent from './PostContent/PostContent.js'
import PostArrow from './PostArrow/PostArrow.js'

import PostLike from './PostLike/PostLike.js'
import PostBalloon from './PostBalloon/PostBalloon.js'
import PostDots from './PostDots/PostDots.js'
import PostFlag from './PostFlag/PostFlag.js'
import PostLikesCount from './PostLikesCount/PostLikesCount.js'
import PostDescription from './PostDescription/PostDescription.js'
//import PostComments from './PostComments/PostComments.js'
import PostCommentInput from './PostCommentInput/PostCommentInput.js'

//store
import store from '~redux/reducers/store.js'
//scss
import './Post.scss'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            contents : {
                count : props.contents.length,
                index : 0,
                isMouseEntered : false
            },
            likes : {
                count : props.likes.length,
                isLiked : props.likes.indexOf(store.getState().user.nick) === -1 ? false : true
            },
            comment : {
                comments : props.comments,
                isFetching : false
            }
        }
    }

    _handleOnArrowLeftClick = () => {
        const { contents } = this.state
        if(contents.Index !== 0){
            this.setState({
                ...this.state,
                contents : {
                    ...this.state.contents,
                    index : this.state.contents.index - 1
                }
            })
        }
    }

    _handleOnArrowRightClick = () => {
        const { contents } = this.state
        if(contents.index < contents.count - 1){
            this.setState({
                ...this.state,
                contents : {
                    ...this.state.contents,
                    index : this.state.contents.index + 1
                }
            })
        }
    }

    _handleOnContentsMouseEnter = () => {
        this.setState({
            ...this.state,
            contents : {
                ...this.state.contents,
                isMouseEntered : true
            }
        })
    }

    _handleOnContentsMouseLeave = () => {
        this.setState({
            ...this.state,
            contents : {
                ...this.state.contents,
                isMouseEntered : false
            }
        })
    }
    
    _handleOnContentsDoubleClick = () => {
        this._handleOnLikeClick()
    }

    _test = () => {
        console.log('test')
    }

    _handleOnLikeClick = () => {
        const { isLiked } = this.state.likes
        let method
        let counter
        if(isLiked){
            method = 'DELETE'
            counter = -1
        } else {
            method = 'PUT'
            counter = +1
        }
        this.setState({
            ...this.state,
            likes : {
                ...this.state.likes,
                isLiked : !isLiked,
                count : this.state.likes.count + counter
            }
        })

        const { _id } = this.props
        fetch(`/api/likes/like/${_id}`, {
            method,
            credentials: "same-origin"
        })
    }

    _handleOnBallonClick = () => {

    }

    _fetchCommentStart = () => {
        return new Promise((resolve, reject) => {
            this.setState({
                ...this.state,
                comment : {
                    ...this.state.comment,
                    isFetching : true
                }
            }, () => { resolve() })
        })
    }

    _fetchComment = (postId, comment) => {
        return new Promise((resolve, reject) => {
            const request = {
                postId,
                user_input_comment : comment
            }
            fetch('/api/comment', {
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                credentials: 'same-origin',
                body : JSON.stringify(request)
            })
            .then(data => data.json())
            .then(json => JSON.parse(json))
            .then(response => resolve(response.comment))
        })
    }

    _setComment = (comment) => {
        this.setState({
            ...this.state,
            comment : {
                ...this.state.comment,
                comments : [
                    ...this.state.comment.comments,
                    comment
                ],
                isFetching : false
            }
        })
    }

    _handleOnCommentInputKeyPress = (e) => {
        if(
            e.key === 'Enter' && 
            e.target.value !== ''
        ){
            const postId = this.props._id
            const comment = e.target.value
            this._fetchCommentStart()
            .then(() => {
                return this._fetchComment(postId, comment)
            })
            .then(comment => {
                this._setComment(comment)
            })
        }
    }

    render(){
        const { 
            profilePhotoUrl,
            nick,
            contents,
            description
        } = this.props
        return(
            <article className="post-article">
                <header className="post-article-header">
                    <PostProfilePhoto url={profilePhotoUrl}/>
                    <PostNick nick={nick}/>
                </header>
                <section 
                    className="post-article-contents"
                    onMouseEnter={this._handleOnContentsMouseEnter} 
                    onMouseLeave={this._handleOnContentsMouseLeave}
                    onDoubleClick={this._handleOnContentsDoubleClick}
                >
                    <PostContent content={contents[this.state.contents.index]}/>
                    {this.state.contents.isMouseEntered === true &&
                        <Fragment>
                            {this.state.contents.index !== 0 && 
                                <PostArrow.left handler={this._handleOnArrowLeftClick}/>
                            }
                            {this.state.contents.index !== this.state.contents.count - 1 && 
                                <PostArrow.right handler={this._handleOnArrowRightClick}/>
                            }
                        </Fragment>
                    }
                </section>
                <section className="__bottom">
                    <div className="post-article-icons-container">
                        <div>
                            <PostLike 
                                like={this.state.likes.isLiked}
                                handleOnLikeClick={this._handleOnLikeClick}
                            />
                            <PostBalloon/>                        
                        </div>
                        <div>
                            {contents.map((content, index) => {
                                let selected
                                if(index === this.state.contents.index){
                                    selected = true
                                } else {
                                    selected = false
                                }
                                return <PostDots key={index} selected={selected}/>
                            })}
                        </div>
                        <div>
                            <PostFlag/>
                        </div>
                    </div>
                    <div className="post-article-likesCount-container">
                        <PostLikesCount count={this.state.likes.count}/>
                    </div>
                    <div>
                        <PostDescription
                            nick={nick}
                            description={description}
                            comments={this.state.comment.comments}
                        />
                    </div>
                    {/* <div className="post-article-comments-container">
                        <PostComments comments={comments}/>
                    </div> */}
                    <div className="post-article-form">
                        <PostCommentInput
                            handler={this._handleOnCommentInputKeyPress}
                            isFetching={this.state.comment.isFetching}
                        />
                    </div>
                </section>
            </article>
        )
    }
}

export default Post