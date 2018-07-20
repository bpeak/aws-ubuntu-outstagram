import React, { Component } from 'react';

import Header from '~components/Header/Header.js'

import Post from '~components/Post/Post.js'
import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'


import './OnePost.scss'

class OnePost extends Component {
    constructor(){
        super()
        this.state = {
            isLoaded : false,
            post : null
        }
    }

    componentDidMount(){
        const postId = this.props.match.params.id
        const request = {
            postId
        }
        fetch('/api/posts/get/one', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            credentials : 'same-origin',
            body : JSON.stringify(request)
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            this.setState({
                ...this.state,
                post : response.post,
                isLoaded : true
            })
        })
    }

    render() {
        return (
            <div className="OnePost">
                <Header/>
                <div className="__main">
                    {this.state.isLoaded === true ?
                        <Post
                            _id={this.state.post._id}
                            nick={this.state.post.nick}
                            profilePhotoUrl={this.state.post.profilePhotoUrl}
                            contents={this.state.post.contents}
                            description={this.state.post.description}
                            likes={this.state.post.likes}
                            flags={this.state.post.flags}
                            comments={this.state.post.comments}
                        />
                        : <LoadingSpinner/>
                    }
                </div>
            </div>
        );
    }
}

export default OnePost;