import React, { Component, Fragment } from 'react'

import './CompassPosts.scss'

import CompassPost from './CompassPost'

class CompassPosts extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <Fragment>
            <div className="compassPosts">
                {this.props.posts.length === 0 
                    ? <div className="text">게시물이 존재하지 않습니다.</div>
                    : <div className="text">인기 게시물</div>
                }
                {this.props.posts.map((post, index) => {
                    return <CompassPost key={index} post={post}/>
                })}
            </div>
            </Fragment>
        )
    }
}

export default CompassPosts