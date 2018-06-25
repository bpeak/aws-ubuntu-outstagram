import React, { Component } from 'react'

//modules
import { Link } from 'react-router-dom'
import hashtagController from '~modules/hashtagController.js'

//scss
import './PostDescription.scss'

class PostDescription extends Component{
    constructor(){
        super()
    }
    render(){
        const {
            nick,
            description,
            comments
        } = this.props
        const authorComment = {
            nick : nick,
            content : description
        }
        const mergedComments = [authorComment, ...comments]
        return (
            <div>
                {mergedComments.map((comment, index) => {
                    return (
                        <PostComment
                            key={index}
                            nick={comment.nick}
                            content={comment.content}
                        />
                    )
                })}
            </div>
        )
    }
}

const PostComment = ({nick, content}) => {
    const contentWords = content.split(' ')
    const test = contentWords.map((contentWord, index) => {
        if(hashtagController.discriminator(contentWord) === true){
            return (
                <PostCommentHashtagWord hashtag={contentWord}/>
            )
        } else {
            return (
                <PostCommentNormalWord text={contentWord}/>
            )
        }
    })
    return (
        <div className="postComment">
            <Link to="/tes" className="__nick">{nick}</Link>
            <div className="__content">{content}</div>
            <div>{test}</div>
        </div>
    )
}

const PostCommentHashtagWord = ({hashtag}) => {
    return (
        <Link to="/">{hashtag}</Link>
    )
}

const PostCommentNormalWord = ({text}) => {
    return (
        <span>
            {text}
        </span>
    )
}

export default PostDescription