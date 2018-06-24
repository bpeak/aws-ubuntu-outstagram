import React, { Component, Fragment } from 'react';

//scss
import './PostComments.scss'

const commentMaxLength = 30

const PostComments = ({comments}) => {
    return (
        <div className="postComments">
            {comments.map((comment, index) => {
                if(comment.content.length > commentMaxLength){
                    return (
                        <PostLongComment key={index} comment={comment}/>
                    )
                } else {
                    return (
                        <PostShortComment key={index} comment={comment}/>
                    )
                }
            })}
        </div>
    )
}

class PostLongComment extends Component {
    constructor(){
        super()
        this.state = {
            isCommentOpend : false
        }
    }

    _handleOnBtnViewMoreClick = () => {
        this.setState({
            ...this.state,
            isCommentOpend : true
        })
    }

    render(){
        const { comment } = this.props
        return (
            <div className="postComment">
                <span className="__nick">{comment.nick}</span>
                <div className="__content __longContent">
                    {this.state.isCommentOpend === true
                        ? <span>{comment.content}</span>
                        : 
                            <Fragment>
                                <span>{comment.content.substring(0, commentMaxLength) + "..."}</span>
                                <button onClick={this._handleOnBtnViewMoreClick}>문구 더 보기</button>
                            </Fragment>  
                    }
                </div>
                
            </div>
        )
    }
}

const PostShortComment = ({comment}) => {
    return (
        <div className="postComment">
            <span className="__nick">{comment.nick}</span>
            <div className="__content">{comment.content}</div>
        </div>
    )
}

export default PostComments