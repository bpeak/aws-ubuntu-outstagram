import React, { Fragment, Component } from 'react';

import Header from '~components/Header/Header.js'
import CompassPost from '~components/Compass/CompassPosts/CompassPost.js'
import './Compass.scss'

import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'

class Compass extends Component {
    constructor(){
        super()
        this.state = {
            postIds : [],
            posts : []
        }
    }


    componentDidMount(){
        const request = {
            postIds : this.state.postIds
        }
        fetch('/api/posts/all', {
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
                posts : response.posts
            })
        })
    }

    render(){
        return (
            <div className="Compass">
                <Header/>
                <div className="__main">
                    <div className="__contents">
                        <span className="__msg">인기 포스트 둘러보기</span>
                        {this.state.posts.length === 0
                            ? 
                                <div className="__loadingSpinner-container"><LoadingSpinner/></div>
                            : 
                                <div>
                                    {this.state.posts.map((post, index) => {
                                        return (
                                            <CompassPost
                                                key={index}
                                                post={post}
                                            />
                                        )
                                    })}
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default Compass