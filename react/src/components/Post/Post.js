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

import PostComments from './PostComments/PostComments.js'
import PostCommentInput from './PostCommentInput/PostCommentInput.js'

//store
import store from '~redux/reducers/store.js'
//scss
import './Post.scss'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            contentsCount : this.props.contents.length,
            contentsIndex : 0,
            contentsMouseEnter : false,
            like : props.likes.indexOf(store.getState().user.nick) === -1 ? false : true,
            comments : this.props.comments
        }
    }

    _handleOnArrowLeftClick = () => {
        const { contentsCount, contentsIndex } = this.state
        if(contentsIndex !== 0){
            this.setState({
                ...this.state,
                contentsIndex : this.state.contentsIndex - 1
            })
        } else {
            //done
        }
    }

    _handleOnArrowRightClick = () => {
        const { contentsCount, contentsIndex } = this.state
        if(contentsIndex < contentsCount - 1){
            this.setState({
                ...this.state,
                contentsIndex : this.state.contentsIndex + 1
            })
        } else {
            //done
        }
    }

    _handleOnContentsMouseEnter = () => {
        this.setState({
            ...this.state,
            contentsMouseEnter : true
        })
    }

    _handleOnContentsMouseLeave = () => {
        this.setState({
            ...this.state,
            contentsMouseEnter : false
        })
    }

    _handleOnLikeClick = () => {
        const currentLike = this.state.like
        this.setState({
            ...this.state,
            like : !currentLike
        })
        let method;
        if(currentLike){
            method = 'DELETE'
        } else {
            method = 'PUT'
        }

        const currentPostId = this.props._id
        fetch(`/api/posts/like/${this.props._id}`, {
            method,
            credentials: "same-origin"
        })
    }

    _handleOnCommentInnputKeyPress = (e) => {
        if(e.key === 'Enter' && e.target.value !== ''){
            const request = {
                postId : this.props._id,
                user_input_postComment : e.target.value
            }
            fetch('api/posts/comment', {
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                credentials: 'same-origin',
                body : JSON.stringify(request)
            })
            .then(data => data.json())
            .then(json => JSON.parse(json))
            .then(response => {
                this.setState({
                    ...this.state,
                    comments : [
                        ...this.state.comments,
                        response.comment
                    ]
                })
            })
        }
    }

    render(){
        const { 
            profilePhotoUrl,
            nick,
            contents,
            likes
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
                >
                    <PostContent content={contents[this.state.contentsIndex]}/>
                    {this.state.contentsMouseEnter === true &&
                        <Fragment>
                            {this.state.contentsIndex !== 0 && 
                                <PostArrow.left handler={this._handleOnArrowLeftClick}/>
                            }
                            {this.state.contentsIndex !== this.state.contentsCount - 1 && 
                                <PostArrow.right handler={this._handleOnArrowRightClick}/>
                            }
                        </Fragment>
                    }
                </section>
                <section className="__bottom">
                    <div className="post-article-icons-container">
                        <div>
                            <PostLike 
                                like={this.state.like}
                                handleOnLikeClick={this._handleOnLikeClick}
                            />
                            <PostBalloon/>                        
                        </div>
                        <div>
                            {contents.map((content, index) => {
                                let selected;
                                if(index === this.state.contentsIndex){
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
                        <PostLikesCount/>
                    </div>
                    <div>
                        <PostComments comments={this.state.comments}/>
                    </div>
                    <div className="post-article-form">
                        <PostCommentInput
                            handler={this._handleOnCommentInnputKeyPress}
                        />
                    </div>
                </section>
            </article>
        )
    }
}

export default Post