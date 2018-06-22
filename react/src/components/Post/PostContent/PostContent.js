import React, { Component, Fragment } from 'react';

//scss
import './PostContent.scss'

import playImg from '~img/post/play.png'

class PostContent extends Component {
    constructor(){
        super()
        this.state = {
            isVideoPlayed : false
        }
    }

    _handleOnVideoClick = () => {
        const { refs_video } = this.refs
        if(refs_video.paused === true){
            this.setState({
                ...this.state,
                isVideoPlayed : true
            })
            this.refs.refs_video.play()
        } else {
            this.setState({
                ...this.state,
                isVideoPlayed : false
            })
            this.refs.refs_video.pause()
        }
    }

    render(){
        const { content } = this.props
        return (
            <Fragment>
                {content.type === "img" &&
                    <img className="postContent" src={content.url}/>
                }
                {content.type === "video" &&
                    <div className="postContent-video-container">
                    <video className="postContent postContent-video" onClick={this._handleOnVideoClick} ref="refs_video">
                        <source src={content.url} type="video/mp4" />
                    </video>
                    {this.state.isVideoPlayed === false && <img className="play" src={playImg}/>}
                    </div>
                }
            </Fragment>
        )
    }
}

export default PostContent