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
            <div className="postComments">
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
                <PostCommentHashtagWord key={index} hashtag={contentWord}/>
            )
        } else {
            return (
                <PostCommentNormalWord key={index} text={contentWord}/>
            )
        }
    })
    const url = `/profile/${nick}`
    return (
        <div className="postComment">
            <Link to={url} className="__nick">{nick}</Link>
            <div className="__content">{test}</div>
        </div>
    )
}

const PostCommentHashtagWord = ({hashtag}) => {
    const pattern = /#/
    const hashtagExceptSharp = hashtag.replace(pattern, '')
    const url = `/compass/hashtags/${hashtagExceptSharp}`
    return (
        <Link className="postCommentWord hashtag" to={url}>
            {hashtag}
        </Link>
    )
}

const PostCommentNormalWord = ({text}) => {
    return (
        <span className="postCommentWord nomal">
            {text}
        </span>
    )
}

export default PostDescription