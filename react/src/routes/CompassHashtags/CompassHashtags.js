import React, { Component, Fragment } from 'react';

import Header from '~components/Header/Header.js'
import CompassHashtagsHeader from '~components/Compass/CompassHashtagsHeader/CompassHashtagsHeader.js'

import CompassPosts from '~components/Compass/CompassPosts/CompassPosts.js'

import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'

import './CompassHashtags.scss'

class CompassHashtags extends Component {
    constructor(props){
        super(props)
        this.state = {
            hashtag : this.props.match.params.hashtag,
            isFetchingPosts : true,
            posts : []
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.match.params.hashtag === this.props.match.params.hashtag){
            //done
        } else {
            this._fetchPostsOfHashtagStart(() => {
                this._fetchPosts(newProps.match.params.hashtag, (err, response) => {
                    if(err){
                        console.log(err)
                    } else {
                        this.setState({
                            ...this.state,
                            hashtag : newProps.match.params.hashtag,
                            isFetchingPosts : false,
                            posts : response.posts
                        })
                    }
                })
            })
        }
    }

    componentDidMount(){
        this._fetchPosts(this.state.hashtag, (err, response) => {
            if(err){
                console.log(err)
            } else {
                this.setState({
                    ...this.state,
                    isFetchingPosts : false,
                    posts : response.posts
                }, console.log('셋스테이트완료'))
            }
        })
    }

    _fetchPostsOfHashtagStart = (callback) => {
        console.log('펫칭포스트트루한다')
        this.setState({
            ...this.state,
            isFetchingPosts : true
        }, callback)
    }

    _fetchPosts = (hashtag, callback) => {
        fetch(`/api/compass/hashtags/${hashtag}`, {
            method : "GET",
            headers : {
                'content-type' : 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            callback(null, response)
        })
        .catch(err => callback(err, null))
    }


    render() {
        return (
            <Fragment>
                <Header/>
                <div className="compassHashtags">
                {this.state.isFetchingPosts === false
                    ?
                        <Fragment>
                            <section className="header">
                                <CompassHashtagsHeader 
                                    hashtag={this.state.hashtag}
                                    mostPopularPostImg={undefined} //이거 제일 좋아요 많이눌러진포스트 이미지 넣어주면되
                                    postsCount={this.state.posts.length}
                            />
                            </section>
                            <section className="main">
                                <CompassPosts posts={this.state.posts}/>
                            </section>
                        </Fragment>
                    :
                        <div className="loadingSpinner">
                            <LoadingSpinner/>
                        </div>
                }
                </div>
            </Fragment>
        );
    }
}

export default CompassHashtags;